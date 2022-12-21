import React, {FC} from 'react';

import QRCode from "react-qr-code";
// @ts-ignore
import cl from"./AssetView.module.css"
import {AssetDrag, OnAssetDragEnd} from "../../../gragAndDrops/assets/assetsDrag";
import {useDispatch} from "react-redux";
import {AssetQrCode} from "../../../structs/Asset";
import {SetAssetQRCode} from "../../../store/action_creator/AppStoreActions";
import {Item} from "../../../structs/App";
interface AssetViewProps {
    asset:Item;
    indexN:number;
    name:string;
}
const AssetView:FC<AssetViewProps> = ({asset,indexN,name}) => {
    const dispatch=useDispatch()
    const onViewClick=()=>{
        let assetQrCode:AssetQrCode={
           code: asset.uuid,
            assetCatalogName:name
        }
        // @ts-ignore
        dispatch(SetAssetQRCode(assetQrCode))
    }
    return (
        <div
            className={cl.wrapper}
            draggable={true}
            onDragStart={()=>AssetDrag(asset)}
            onDragEnd={()=>OnAssetDragEnd()}
            onClick={onViewClick}
        >
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