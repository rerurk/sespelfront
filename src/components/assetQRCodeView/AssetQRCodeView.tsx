import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetQRCodeView.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
import QRCode from "react-qr-code";
import {useDispatch} from "react-redux";
import {SetAssetQRCode} from "../../store/action_creator/CatalogStoreActions";

const AssetQRCodeView: FC = () => {
    const dispatch=useDispatch()
    const {assetQrCode} = useTypeSelector(state => state.showCatalogNode)
    const closeView=()=>{
        // @ts-ignore
        dispatch(SetAssetQRCode(null))
    }
    console.log(assetQrCode)
    if (assetQrCode) {
        return (
            <div className={cl.wrapper}>
                <span className={cl.wrapper_assetName}>{assetQrCode.assetCatalogName}</span>
                <div className={cl.wrapper_qrcode}>
                    <QRCode value={assetQrCode.code} style={{height: "auto", maxWidth: "100%", width: "100%"}}/>

                </div>
                <button onClick={closeView}>закрыть</button>
            </div>
        )
    }
    ;
    return (<></>)
};

export default AssetQRCodeView;