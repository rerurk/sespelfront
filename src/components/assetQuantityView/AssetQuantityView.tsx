import React, {FC} from 'react';
import {AssetQuantity} from "../../structs/Asset";
// @ts-ignore
import cl from "./AssetQuantityView.module.css"
interface AssetQuantityViewProps{
    assetQuantity:AssetQuantity
    ind:number
}

const AssetQuantityView:FC<AssetQuantityViewProps> = ({assetQuantity,ind}) => {
    return (
        <div className={cl.wrapper}>

            <div className={cl.wrapper_ind}> <span>{ind}.</span></div>
            <div className={cl.wrapper_name}> <span>{assetQuantity.name}</span></div>
            <div className={cl.wrapper_quantity}> <span>{assetQuantity.quantity}</span></div>
        </div>
    );
};

export default AssetQuantityView;