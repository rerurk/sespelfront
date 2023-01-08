import React, {FC, useEffect, useState} from 'react';
import {QrCodeFields, TAsset} from "../../structs/Asset";
import AssetQRCode from "../assetQRCodeView/AssetQRCode";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Fetches} from "../../fetches/Fetches";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";
import {StrUUID} from "../../structs/App";
import CloseBt from "../UI/closeBt/CloseBt";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import BtImg from "../UI/btImg/BtImg";
import {Domen} from "../../fetches/Requests";
// @ts-ignore
import cl from './PrintQrCodes.module.css'

const PrintQrCodes: FC = () => {

    const {qrCodes} = useTypeSelector(state => state.appReducer)

    const [codesToPrint, setCodesToPrint] = useState<QrCodeFields[] | null>(qrCodes)
    const [step, setStep] = useState<number>(codesToPrint ? codesToPrint.length : 0)
    const [curInd, setCurInd] = useState<number>(0)
    const [isShow, setIsShow] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {

        setCodesToPrint(() => qrCodes)

    }, [qrCodes?.length])
    const onQrCodePress = (uuid: string) => {
        let strSend: StrUUID = {
            uuid: uuid
        }
        Fetches.GetAssetBySTRUUID(strSend).then(r => {
            let as: TAsset | Error = r
            if (!(as instanceof Error) && as.asset.id > 0) {
                // @ts-ignore
                dispatch(SetSelectedAssetState(as))
                navigate(RouterPath.QR_SCAN_RESULT)
            }
        })
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (codesToPrint) {
            let quantity: number
            if (e.target.value == "") {
                quantity = codesToPrint.length
            } else {
                quantity = Number(e.target.value)
                if (quantity > codesToPrint.length) {
                    quantity = codesToPrint.length
                }
            }

            setCodesToPrint(() => codesToPrint.slice(0, quantity))
            setStep(() => quantity)
            setCurInd(() => 0)
        }
    }
    const onNextPress = () => {
        if (codesToPrint && step) {
            let ind: number = curInd + step
            if (ind > codesToPrint.length) {
                ind = codesToPrint.length

            }
            setCodesToPrint(() => codesToPrint.slice(ind, ind + step))
            setCurInd(() => ind)
        }

    }
    const onPrevPress = () => {
        if (codesToPrint && step) {
            let ind: number = curInd - step

            if (curInd - step < 1) {

                setCodesToPrint(() => codesToPrint.slice(0, step))

                setCurInd(() => 0)
            } else {
                setCodesToPrint(() => codesToPrint.slice(ind - step, ind))
                setCurInd(() => ind)

            }
        }
    }

    if (codesToPrint && codesToPrint.length > 0 && isShow) {

        return (

            <div className={cl.wrapper}>

                <div className={cl.wrapper_printPage} id="qrCodePrint">
                    {
                        codesToPrint.map((prints: QrCodeFields) =>
                            <div onClick={() => onQrCodePress(prints.code)} key={"Qr_wrapper_" + prints.code}>
                                <AssetQRCode
                                    assetQrCodeFields={prints}
                                    key={"wrCodePrint_" + prints.code}
                                />
                            </div>)

                    }
                    <CloseBt close={() => setIsShow(false)}/>
                </div>
                <div className={cl.wrapper_bts}>
                    <div className={cl.wrapper_bts_printItems}>
                        <button onClick={onPrevPress} className={curInd - step < 0 ? cl.bts_hide : cl.bts_show}
                                key={"PrintQrCodes_bt_prev"}>&laquo; пред {step}</button>
                        <input defaultValue={codesToPrint.length} key={"PrintQrCodes_q"} onChange={onInputChange}
                               type={"number"}/>
                        <button onClick={onNextPress}
                                className={curInd + step >= codesToPrint.length ? cl.bts_hide : cl.bts_show}
                                key={"PrintQrCodes_bt_next"}>&raquo; след {step}</button>
                    </div>
                    <button onClick={() => window.print()}>печать</button>

                </div>

            </div>
        )
    }
    if (codesToPrint && codesToPrint.length > 0 && !isShow) {
        return (
            <div>
                <BtImg onBtClick={() => setIsShow(true)} imgURL={Domen + "/images/printQrCodes.png"} text={"печать"}
                       classN={cl.bt_show}/>
            </div>)
    }
    return (<div/>)
};

export default PrintQrCodes;