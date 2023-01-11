import React, {FC} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeAsset.module.css"
import NomenclatureItemView from "../../components/nomenclatureItemsShow/NomenclatureItemView";
import StoreTree from "../../components/stores/storeTree/StoreTree";

import {TMakeNewAsset} from "../../structs/Asset";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";


let newAsset: TMakeNewAsset = {
    asset_nomenclature_item: null,
    asset_store: null

}


const MakeAsset: FC = () => {
    const {storeGroupRoot, nomenclatureRoot, selectedStore, selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)

    const onMakeClick = () => {
        if (selectedStore && selectedNomenclatureItem) {
            let conf = window.confirm(` Содать ТМЦ ${selectedNomenclatureItem.name} в ${selectedStore.name}?`)
            if (conf) {
                newAsset.asset_store = Tools.unRefCatalogItem(selectedStore)
                newAsset.asset_nomenclature_item = Tools.unRefCatalogItem(selectedNomenclatureItem)
                Fetches.MakeAsset(newAsset).then(r => {
                    if (!(r instanceof Error)) {

                    }
                })
            }
        }
    }
    if (storeGroupRoot && nomenclatureRoot)
        return (

            <div className={cl.wrapper}>
                <div className={cl.wrapper_selectedStoreAngNomenclature}>
                    <div>
                        <label>Склад:</label><span>{selectedStore ? selectedStore.name : ""}</span>
                    </div>
                    <div>
                        <label>Наименование:</label><span>{selectedNomenclatureItem ? selectedNomenclatureItem.name : false}</span>
                    </div>
                </div>
                <div className={cl.wrapper_makeAsset}>
                    <button onClick={onMakeClick}>СОЗДАТЬ</button>
                    <div>
                        <span> указать серийный номер</span>
                        <input type={"checkbox"}/>
                    </div>
                </div>
                <div className={cl.wrapper_selectStoreAngNomenclature}>
                    <NomenclatureItemView item={nomenclatureRoot}/>
                    <StoreTree item={storeGroupRoot}/>
                </div>

            </div>
        );
    return (<div/>)
};

export default MakeAsset;