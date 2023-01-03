import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetQRCode.module.css"

import QRCode from "react-qr-code";
import {AssetQrCodeFields} from "../../structs/Asset";


interface AssetQRCodeProps {
    assetQrCodeFields:AssetQrCodeFields

}

const AssetQRCode: FC<AssetQRCodeProps> = ({assetQrCodeFields}) => {


    return (
        <div className={cl.wrapper}>

            <span className={cl.wrapper_assetName}>{assetQrCodeFields.assetNomenclatureName}</span>
            <div className={cl.wrapper_qrcode}>
                <QRCode value={assetQrCodeFields.assetUUID} style={{height: "auto", maxWidth: "100%", width: "100%"}}/>

            </div>
            <span className={cl.wrapper_assetName}>{assetQrCodeFields.assetUUID}</span>
        </div>
    )


};

export default AssetQRCode;