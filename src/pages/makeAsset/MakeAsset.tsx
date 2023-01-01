import React, {FC, useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeAsset.module.css"
import NomenclatureItemView from "../../components/nomenclatureItemsShow/NomenclatureItemView";
import StoreTree from "../../components/stores/storeTree/StoreTree";

import {TAsset, TMakeNewAsset} from "../../structs/Asset";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import AssetQRCode from "../../components/assetQRCodeView/AssetQRCode";
import {useNavigate} from "react-router-dom";
import PrintQrCodes from "../printQrCodes/PrintQrCodes";


let newAsset: TMakeNewAsset = {
    asset_nomenclature_item: null,
    asset_store: null

}


const MakeAsset: FC = () => {

    const navigate = useNavigate();
    const {storeGroupRoot, nomenclatureRoot, selectedStore, selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)
    const [newMakedAssets, setNewMakedAssets] = useState<TAsset[]>([])
    const [showPrintQrCodes,setShowPrintQrCodes]=useState<boolean>(false)
    useEffect(() => {
        Fetches.GetNotAcceptedAssets().then(r => {
            if (!(r instanceof Error)) {
                setNewMakedAssets(r)
            }
        })

    }, [])
    const onPrintClick = () => {
          setShowPrintQrCodes(()=>!showPrintQrCodes)
    }
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
                    <StoreTree item={storeGroupRoot}/>
                </div>
                <div className={cl.wrapper_newAssets}>
                    <button style={{
                        position: "absolute",
                        left: "0"
                    }}
                            onClick={onPrintClick}
                    >печать
                    </button>
                    {
                        newMakedAssets
                            ? newMakedAssets.map((a: TAsset) =>
                                <div key={"QRCode_" + a.asset.uuid} className={cl.wrapper_newAssets_qrCode}>
                                    <AssetQRCode asset={a}/>
                                </div>
                            )
                            : false
                    }
                </div>
                {showPrintQrCodes
                    ?<PrintQrCodes assetsToPrint={newMakedAssets} close={() => onPrintClick()}/>
                    :false
                }
            </div>
        );
    return (<div/>)
};

export default MakeAsset;