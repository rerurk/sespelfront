import React, {FC, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeAsset.module.css"
import NomenclatureItemView from "../../components/nomenclatureItemsShow/NomenclatureItemView";
import StoreGroupItem from "../../components/stores/storeGroupItem/StoreGroupItem";

import {TAsset, TMakeNewAsset} from "../../structs/Asset";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import QRCode from "react-qr-code";

let newAsset: TMakeNewAsset = {
    asset_nomenclature_item: null,
    asset_store: null

}


const MakeAsset: FC = () => {
    const {storeGroupRoot, nomenclatureRoot, selectedStore, selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)
    const [newMakedAssets, setNewMakedAssets] = useState<TAsset[]>([])
    const onMakeClick = () => {
        if (selectedStore && selectedNomenclatureItem) {
            let conf = window.confirm(` Содать ТМЦ ${selectedNomenclatureItem.name} в ${selectedStore.name}?`)
            if (conf) {
                newAsset.asset_store = Tools.unRefCatalogItem(selectedStore)
                newAsset.asset_nomenclature_item = Tools.unRefCatalogItem(selectedNomenclatureItem)
                Fetches.MakeAsset(newAsset).then(r => {
                    if (!(r instanceof Error)) {
                        newMakedAssets.push(r)
                        console.log(newMakedAssets)
                        setNewMakedAssets(() => [...newMakedAssets])
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
                </div>
                <div className={cl.wrapper_selectStoreAngNomenclature}>
                    <NomenclatureItemView item={nomenclatureRoot}/>
                    <StoreGroupItem item={storeGroupRoot}/>
                </div>

                <div className={cl.wrapper_newAssets}>
                    {
                        newMakedAssets
                            ? newMakedAssets.map((a: TAsset) =>
                                <div>
                                    <QRCode value={a.asset.uuid} style={{height: "auto", maxWidth: "5rem", width: "5rem"}}/>
                                </div>
                            )
                            : false
                    }
                </div>

            </div>
        );
    return (<div/>)
};

export default MakeAsset;