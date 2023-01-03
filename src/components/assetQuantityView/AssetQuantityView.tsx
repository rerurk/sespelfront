import React, {FC} from 'react';
import {AssetsUUIDByNomenclItem} from "../../structs/Asset";
// @ts-ignore
import cl from "./AssetQuantityView.module.css"
interface AssetQuantityViewProps{
    assetsUUIDByName:AssetsUUIDByNomenclItem
    ind:number

}

const AssetQuantityView:FC<AssetQuantityViewProps> = ({assetsUUIDByName,ind}) => {
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_ind}> <span>{ind}.</span></div>
            <div className={cl.wrapper_name}> <span>{assetsUUIDByName.nomencl_item.name}</span></div>
            <div className={cl.wrapper_quantity}> <span>{assetsUUIDByName.assets_uuid.length}</span></div>
        </div>
    );
};

export default AssetQuantityView;