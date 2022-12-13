import React, {FC} from 'react';
// @ts-ignore
import cl from"./MakeAsset.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Item} from "../../structs/catalog";
import {AppItemMasks} from "../../App";
import {Tools} from "../../tools/Tools";

import {Fetches} from "../../fetches/Fetches";
import {NewAsset} from "../../structs/Asset";
const MakeAsset:FC = () => {
    const {currCatalogItem} = useTypeSelector(state => state.showCatalogNode)
    const onBtCreate=()=>{
        if(currCatalogItem) {
            // вместо имени присвоим sysid наименования owner будет место хранения по умолчнию задаться основной склад
            let newAsset: Item = {
                id: -1,
                items: null,
                mask: AppItemMasks.ASSET_MASK,
                name: "",
                owner: null,
                sys_id: ""
            }
            let   assetCatalogItem:Item=Tools.unRefCatalogItem(currCatalogItem)
            let makeAsset:NewAsset={
                asset_catalog_item:assetCatalogItem,
                asset:newAsset
            }
            Fetches.MakeNewAsset(makeAsset).then(r=>console.log(r))

        }
        }
    return (
        <div onClick={e=>e.stopPropagation()} className={cl.wrapper}>
           <button onClick={onBtCreate}>Создать</button>
        </div>
    );
};

export default MakeAsset;