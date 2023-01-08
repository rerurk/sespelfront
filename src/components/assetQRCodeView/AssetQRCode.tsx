import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetQRCode.module.css"

import QRCode from "react-qr-code";
import {QrCodeFields} from "../../structs/Asset";


interface AssetQRCodeProps {
    assetQrCodeFields:QrCodeFields

}

const AssetQRCode: FC<AssetQRCodeProps> = ({assetQrCodeFields}) => {

    return (
        <div className={cl.wrapper}>

            <span className={cl.wrapper_assetName}>{assetQrCodeFields.name}</span>
            <div className={cl.wrapper_qrcode}>
                <QRCode value={assetQrCodeFields.code} style={{height: "auto", maxWidth: "100%", width: "100%"}}/>

            </div>
            <span className={cl.wrapper_assetName}>{assetQrCodeFields.code}</span>
        </div>
    )


};

export default AssetQRCode;