import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetQRCode.module.css"

import QRCode from "react-qr-code";
import {TAsset} from "../../structs/Asset";

interface AssetQRCodeProps {
    asset: TAsset
}

const AssetQRCode: FC<AssetQRCodeProps> = ({asset}) => {


    return (
        <div className={cl.wrapper}>

            <span className={cl.wrapper_assetName}>{asset.nomenclature.name}</span>
            <div className={cl.wrapper_qrcode}>
                <QRCode value={asset.asset.uuid} style={{height: "auto", maxWidth: "100%", width: "100%"}}/>

            </div>
            <span className={cl.wrapper_assetName}>{asset.asset.uuid}</span>
        </div>
    )


};

export default AssetQRCode;