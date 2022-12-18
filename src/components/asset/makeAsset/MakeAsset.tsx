import React, {FC} from 'react';
// @ts-ignore
import cl from "./MakeAsset.module.css"
import {useTypeSelector} from "../../../hooks/useTypeSelector";
import {Item} from "../../../structs/catalog";
import {AppItemMasks} from "../../../App";
import {Tools} from "../../../tools/Tools";

import {Fetches} from "../../../fetches/Fetches";
import {NewAsset} from "../../../structs/Asset";
import StoresSelect from "../../assetsStores/StoresSelect";
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../../router";
const MakeAsset:FC = () => {
    const {currCatalogItem,currentStore} = useTypeSelector(state => state.showCatalogNode)
    const navigate = useNavigate();
    const onBtCreate=()=>{
        if(currCatalogItem) {
            // вместо имени присвоим sysid наименования owner будет место хранения по умолчнию задаться основной склад
            let newAsset: Item = {
                id: -1,
                mask: AppItemMasks.ASSET_MASK,
                name: "",
                owner_uuid: null,
                uuid:""
            }
            let   assetCatalogItem:Item=Tools.unRefCatalogItem(currCatalogItem)
            if(currentStore) {
                let makeAsset: NewAsset = {
                    asset_catalog_item: assetCatalogItem,
                    asset_store: currentStore.item,
                    asset: newAsset
                }
                Fetches.MakeNewAsset(makeAsset).then(r => console.log(r))
            }
        }
        }
    return (
        <div onClick={e=>e.stopPropagation()} className={cl.wrapper}>
            <button onClick={()=>navigate(RouterPath.SHOW_CATALOG)}>вернуться</button>
            <h3>создать ТМЦ {currCatalogItem?.name}</h3>
            <h3>на складе</h3>
            <StoresSelect/>
            <button onClick={onBtCreate}>Создать</button>
        </div>
    );
};

export default MakeAsset;