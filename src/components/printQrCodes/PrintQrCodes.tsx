import React, {FC, useEffect, useState} from 'react';
import {QrCodeFields, TAsset} from "../../structs/Asset";
import AssetQRCode from "../assetQRCodeView/AssetQRCode";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Fetches} from "../../fetches/Fetches";
import {RemoveQrCodeFromState, SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
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

    const [codesToPrint, setCodesToPrint] = useState<QrCodeFields[]>(qrCodes?qrCodes:[])

    const [step, setStep] = useState<number>(codesToPrint ? codesToPrint.length : 0)

    const [curInd, setCurInd] = useState<number>(0)

    const [isShow, setIsShow] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    console.log("qrCodes",qrCodes)
    console.log("codesToPrint",codesToPrint)
    useEffect(() => {
          if(qrCodes) {
              setCodesToPrint(() => qrCodes)
          }
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
                setIsShow(()=>false )
                navigate(RouterPath.QR_SCAN_RESULT)

            }
        })
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (codesToPrint&&qrCodes) {
            let quantity: number
            if (e.target.value == "") {
                quantity = codesToPrint.length
            } else {
                quantity = Number(e.target.value)
                console.log(quantity)
                if (quantity > qrCodes.length) {
                    quantity = qrCodes.length
                }
            }
            console.log("quantity:",quantity)
            setCodesToPrint(() => qrCodes.slice(0, quantity))
            setStep(() => quantity)
            setCurInd(() => 0)

        }
    }
    const onNextPress = () => {
        if (qrCodes && step) {
            let ind: number = curInd + step
            if (ind > qrCodes.length) {
                ind = qrCodes.length

            }
            setCodesToPrint(() => qrCodes.slice(ind, ind + step))
            setCurInd(() => ind)
        }

    }
    const onPrevPress = () => {
        if (qrCodes && step) {
            let ind: number = curInd - step

            if (curInd - step < 1) {

                setCodesToPrint(() => qrCodes.slice(0, step))

                setCurInd(() => 0)
            } else {
                setCodesToPrint(() => qrCodes.slice(ind - step, ind))
                setCurInd(() => ind)

            }
        }
    }
    const onRemoveClick=(qrFields:QrCodeFields)=>{
       // @ts-ignore
        dispatch(RemoveQrCodeFromState(qrFields))
    }

    if (qrCodes&&qrCodes.length > 0 && isShow) {

        return (

            <div className={cl.wrapper}>

                <div className={cl.wrapper_printPage} id="qrCodePrint">
                    {
                        codesToPrint.map((qrCodeFields: QrCodeFields) =>
                            <div
                                className={cl.wrapper_qrCode_wrapper}
                                onClick={() => onQrCodePress(qrCodeFields.code)}
                                key={"Qr_wrapper_" + qrCodeFields.code}
                            >
                                <AssetQRCode
                                    assetQrCodeFields={qrCodeFields}
                                    key={"wrCodePrint_" + qrCodeFields.code}
                                />
                                <div className={cl.wrapper_qrCode_wrapper_bt} onClick={(event => event.stopPropagation())}>
                                     <CloseBt close={()=>onRemoveClick(qrCodeFields)}/>
                                </div>
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
                                className={curInd + step >= qrCodes.length ? cl.bts_hide : cl.bts_show}
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
                       classN={cl.bt_print}/>
            </div>)
    }
    return (<div/>)
};

export default PrintQrCodes;