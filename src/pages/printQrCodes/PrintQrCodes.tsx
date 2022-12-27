import React from 'react';
// @ts-ignore
import cl from './PrintQrCodes.module.css'
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {TAsset} from "../../structs/Asset";
import AssetQRCode from "../../components/assetQRCodeView/AssetQRCode";

let assetsToPrint: TAsset[] = []

export function SetAssetsForPrint(assets:TAsset[]) {
  assetsToPrint=assets
}

const PrintQrCodes = () => {
    const navigate = useNavigate();

    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_bts}>
                <button onClick={() => window.print()}>печать</button>
                <button onClick={() => navigate(RouterPath.CREATE_ASSET)}>назад</button>
            </div>
            <div className={cl.wrapper_printPage} id="qrCodePrint">
                {
                    assetsToPrint.map((as:TAsset)=><AssetQRCode asset={as} key={"wrCodePrint_"+as.asset.uuid}/>)
                }

            </div>
        </div>
    );
};

export default PrintQrCodes;