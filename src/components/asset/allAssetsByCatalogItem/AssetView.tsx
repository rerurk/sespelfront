import React, {FC} from 'react';
import {Item} from "../../../structs/catalog";
import QRCode from "react-qr-code";
// @ts-ignore
import cl from"./AssetView.module.css"
interface AssetViewProps {
    asset:Item;
    indexN:number;
    name:string;
}
const AssetView:FC<AssetViewProps> = ({asset,indexN,name}) => {
    return (
        <div className={cl.wrapper}>
           <div>
               {indexN}
           </div>
            <div>
                {name}
            </div>
            <div className={cl.wrapper_asset_uuid}>
                {asset.uuid}
            </div>
            <div className={cl.wrapper_qr}>
                <QRCode value={asset.uuid} style={{ height: "auto", maxWidth: "100%", width: "100%" }}/>
            </div>
        </div>
    );
};

export default AssetView;