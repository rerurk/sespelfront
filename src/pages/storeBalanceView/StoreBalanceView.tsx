import React, {FC, useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./StoreBalanceView.module.css"
import StoreTree from "../../components/stores/storeTree/StoreTree";
import {Fetches} from "../../fetches/Fetches";
import {Tools} from "../../tools/Tools";
import {StoreBalance} from "../../structs/storesTypes";
import {AssetsUUIDByNomenclItem, TAsset} from "../../structs/Asset";
import AssetQuantityView from "../../components/assetQuantityView/AssetQuantityView";

import PrintQrCodes from "../printQrCodes/PrintQrCodes";
import {Item} from "../../structs/App";


/*
* 1.Получем useEffect storeBalance {nomencItem:Item,assetsUUids:string[]}
* 2.отображаем как nomencl name:assetsUUids.lenght
* 3. при клике на отображение показываем qrCode всех тмц принадлежащих этому наименованию на текущем складе
*
* */

const StoreBalanceView: FC = () => {
    const {storeGroupRoot, selectedStoreGroup, selectedStore} = useTypeSelector(state => state.appReducer)
    const [storeBalance, setStoreBalance] = useState<StoreBalance | null>(null)
    const [showAssets, setShowAssets] = useState<TAsset[] | null>(null)
    useEffect(() => {
        setStoreBalance(null)
    }, [selectedStoreGroup, selectedStore])
    const onShowBalanceClick = () => {
        if (selectedStore) {

            Fetches.GetStoreBalance(Tools.unRefCatalogItem(selectedStore)).then(r => {
                if (!(r instanceof Error)) {
                     let sb:StoreBalance=r
                    sb.assets.sort((a, b) =>
                    {
                        if(a.nomencl_item.name>b.nomencl_item.name){return 1}
                        return -1
                    })
                    if (r.assets && r.assets.length > 0) {

                        setStoreBalance(() => sb)

                    }

                }
            })
        }
    }

    const onStoreNameClick=()=>{
        console.log(storeBalance?.assets)
        let assets: TAsset[] = []
        if(storeBalance&&storeBalance.assets){
            storeBalance.assets.forEach((a:AssetsUUIDByNomenclItem)=>{
                a.assets_uuid.forEach((uuid: string) => {
                    let as: TAsset = makeTAsset(a.nomencl_item,uuid)
                    assets.push(as)
                })

            })
            console.log(assets.length)
            setShowAssets(() => assets)
        }

    }

    const showAssetsQrCodes = (a: AssetsUUIDByNomenclItem) => {
        let assets: TAsset[] = []
        if (selectedStore) {
            a.assets_uuid.forEach((uuid: string) => {
                let as: TAsset = makeTAsset(a.nomencl_item,uuid)
                assets.push(as)
            })
            setShowAssets(() => assets)
        }

    }
    const setAssetNULL = () => {
        setShowAssets(() => null)
    }

    function makeTAsset(nom: Item, assetUUID: string): TAsset {


        let as: TAsset = {
            // @ts-ignore
            store: selectedStore,
            nomenclature: nom,
            asset: {
                type: 0,
                id: -1,
                // @ts-ignore
                owner_uuid: selectedStore.uuid,
                name: nom.uuid,
                uuid: assetUUID
            }

        }
        return as

    }


    if (storeGroupRoot) {
        return (
            <div className={cl.wrapper}>

                {selectedStore
                    ? <div className={cl.wrapper_tools}>
                        <span>Выбранный склад:{selectedStore.name}</span>
                        <button onClick={onShowBalanceClick}>показать остатки</button>
                    </div>

                    : false

                }
                <div className={cl.wrapper_StoreTree}>
                    <StoreTree item={storeGroupRoot}/>
                </div>
                {storeBalance
                    ? <div className={cl.wrapper_storeBalance} onClick={event => event.stopPropagation()}>

                        <span onClick={onStoreNameClick}> СКЛАД:{storeBalance.store.name} </span>
                        <div className={cl.wrapper_storeBalance_close} onClick={() => setStoreBalance(null)}>x</div>
                        <div className={cl.wrapper_storeBalance_head}>
                            <div className={cl.wrapper_storeBalance_head_name}>
                                <span>Наименование</span>
                            </div>
                            <div className={cl.wrapper_storeBalance_head_quantity}>
                                <span> шт.</span>
                            </div>
                        </div>
                        <div className={cl.wrapper_storeBalance_assetsQuantity}>
                            {
                                storeBalance.assets.map((a: AssetsUUIDByNomenclItem, ind) =>
                                    <div onClick={() => showAssetsQrCodes(a)} key={"AssetQuantityView_wrapper" + ind}>
                                        <AssetQuantityView
                                            key={"AssetQuantityView+" + ind}
                                            assetsUUIDByName={a}
                                            ind={ind + 1}

                                        />
                                    </div>)

                            }
                        </div>

                    </div>
                    : false
                }
                {
                    showAssets
                        ? <PrintQrCodes assetsToPrint={showAssets} close={setAssetNULL}/>
                        : false
                }

            </div>
        );
    }
    return (<div/>)
};

export default StoreBalanceView;