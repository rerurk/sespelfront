import React, {FC, useState} from 'react';
// @ts-ignore
import cl from './PrintQrCodes.module.css'

import {TAsset} from "../../structs/Asset";
import AssetQRCode from "../../components/assetQRCodeView/AssetQRCode";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {Fetches} from "../../fetches/Fetches";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";
import {StrUUID} from "../../structs/App";
import CloseBt from "../../components/UI/closeBt/CloseBt";

interface PrintQrCodesProps {
    assetsToPrint: TAsset[]
    close: () => void
}


const PrintQrCodes: FC<PrintQrCodesProps> = ({assetsToPrint, close}) => {

    const [assetsForPrint, setAssetsForPrint] = useState<TAsset[]>(assetsToPrint)
    const [step, setStep] = useState<number>(assetsToPrint.length)
    const [curInd, setCurInd] = useState<number>(0)
    const navigate = useNavigate();
    const dispatch = useDispatch()

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
        let quantity: number
        if (e.target.value == "") {
            quantity = assetsToPrint.length
        } else {
            quantity = Number(e.target.value)
            if (quantity > assetsToPrint.length) {
                quantity = assetsToPrint.length
            }
        }

        setAssetsForPrint(() => assetsToPrint.slice(0, quantity))
        setStep(() => quantity)
        setCurInd(() => 0)

    }
    const onNextPress = () => {
        let ind: number = curInd + step
        if (ind > assetsToPrint.length) {
            ind = assetsToPrint.length

        }
        setAssetsForPrint(() => assetsToPrint.slice(ind, ind + step))
        setCurInd(() => ind)


    }
    const onPrevPress = () => {
        let ind: number = curInd - step

        if (curInd - step < 1) {

            setAssetsForPrint(() => assetsToPrint.slice(0, step))

            setCurInd(() => 0)
        } else {
            setAssetsForPrint(() => assetsToPrint.slice(ind - step, ind))
            setCurInd(() => ind)

        }
    }

    return (
        <div className={cl.wrapper}>

            <div className={cl.wrapper_printPage} id="qrCodePrint">
                {
                    assetsForPrint.map((as: TAsset) =>
                        <div onClick={() => onQrCodePress(as.asset.uuid)} key={"Qr_wrapper_" + as.asset.uuid}>
                            <AssetQRCode
                                assetQrCodeFields={{
                                    assetNomenclatureName: as.nomenclature.name,
                                    assetUUID: as.asset.uuid
                                }}
                                key={"wrCodePrint_" + as.asset.uuid}
                            />
                        </div>)
                }

            </div>
            <div className={cl.wrapper_bts}>
                <div className={cl.wrapper_bts_printItems}>
                    <button onClick={onPrevPress} className={curInd - step < 0 ? cl.bt_hide : cl.bt_show}
                            key={"PrintQrCodes_bt_prev"}>&laquo; пред {step}</button>
                    <input defaultValue={assetsToPrint.length} key={"PrintQrCodes_q"} onChange={onInputChange}
                           type={"number"}/>
                    <button onClick={onNextPress}
                            className={curInd + step >= assetsToPrint.length ? cl.bt_hide : cl.bt_show}
                            key={"PrintQrCodes_bt_next"}>&raquo; след {step}</button>
                </div>
                <button onClick={() => window.print()}>печать</button>

            </div>
            <CloseBt close={()=>close()}/>
        </div>
    );
};

export default PrintQrCodes;