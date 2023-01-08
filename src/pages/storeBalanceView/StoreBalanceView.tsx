import React, {FC, useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./StoreBalanceView.module.css"
import StoreTree from "../../components/stores/storeTree/StoreTree";
import {Fetches} from "../../fetches/Fetches";

import {StoreBalance} from "../../structs/storesTypes";
import {NomenclItemAndHisUUIDS, uuid_time, TAsset} from "../../structs/Asset";
import AssetQuantityView from "../../components/assetQuantityView/AssetQuantityView";

import {Item} from "../../structs/App";
import {useDispatch} from "react-redux";
import {SetSelectedAssetsState, SetStoreBalanceState} from "../../store/action_creator/AppStoreActions";
import CloseBt from "../../components/UI/closeBt/CloseBt";
import AssetsList from "../../components/assetsList/AssetsList";


/*
* 1.а useEffect получим storeBalance {nomencItem:Item,assetsUUids:string[]}
* 2.отображаем как nomencl name:assetsUUids.lenght
* 3. при клике на отображение показываем qrCode всех тмц принадлежащих этому наименованию на текущем складе , пр клик на qr показываем тмц
*
* */

const StoreBalanceView: FC = () => {
    const dispatch = useDispatch()
    const {storeGroupRoot, selectedStore,storeBalance} = useTypeSelector(state => state.appReducer)
    const [assetsList,setAssetsList]=useState<NomenclItemAndHisUUIDS[]|null>(null)

    useEffect(() => {
             if(storeBalance){
                 getStoreBalance(storeBalance)
             }
    },)



    const closeView = () => {
        setStoreBalance(null)
    }

    const setShowAssets = (assets: TAsset[] | null) => {
        // @ts-ignore
        dispatch(SetSelectedAssetsState(assets))
    }

    function setStoreBalance(sb: StoreBalance | null) {
        // @ts-ignore
        dispatch(SetStoreBalanceState(sb))
    }

    const onShowBalanceClick = () => {
        if (selectedStore) {
            let newSB:StoreBalance={
                store:selectedStore,
                nomenclItemAndHisUUIDS:[]

            }
            getStoreBalance(newSB)

        }
    }

    function getStoreBalance(sb:StoreBalance) {

            Fetches.GetStoreBalance((sb.store)).then(r => {

                if (!(r instanceof Error)) {
                    let sb: StoreBalance = r

                    if (sb.nomenclItemAndHisUUIDS) {
                        sb.nomenclItemAndHisUUIDS.sort((a, b) => {
                            if (a.nomencl_item.name > b.nomencl_item.name) {
                                return 1
                            }
                            return -1
                        })

                        if (JSON.stringify(storeBalance)!==JSON.stringify(sb)){

                            setStoreBalance(sb)
                            // @ts-ignore
                            dispatch(SetSelectedAssetsState(null))
                        }


                    } else {
                        setStoreBalance(null)
                        // @ts-ignore
                        dispatch(SetSelectedAssetsState(null))
                        alert(" Склад " + sb.store.name + " пустой")
                    }
                }
            })


    }

    const onStoreNameClick = () => {

          if(storeBalance){
              setAssetsList(storeBalance.nomenclItemAndHisUUIDS)
          }
    }

    const showAssetsList = (a: NomenclItemAndHisUUIDS) => {
    setAssetsList([a])
    }

    const setAssetNULL = () => {
        setShowAssets(null)
    }

    function makeTAsset(nom: Item, assetUUID: string): TAsset {
        return {
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

    }


    if (storeGroupRoot) {
        return (
            <div className={cl.wrapper}>

                {selectedStore
                    ? <div className={cl.wrapper_tools}>
                        <span>Выбранный склад:<strong>{selectedStore.name}</strong></span>
                        <button onClick={onShowBalanceClick}>баланс</button>
                    </div>

                    : false

                }
                <div className={cl.wrapper_StoreTree}>
                    <StoreTree item={storeGroupRoot}/>
                </div>
                {storeBalance
                    ? <div className={cl.wrapper_storeBalance} onClick={event => event.stopPropagation()}>
                        <div className={cl.wrapper_storeBalance_head_storeName} onClick={onStoreNameClick}>
                            <span > СКЛАД:{storeBalance.store.name} </span>
                        </div>
                        <CloseBt close={() => closeView()}/>
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
                                storeBalance.nomenclItemAndHisUUIDS.map((a: NomenclItemAndHisUUIDS, ind) =>
                                    <div onClick={() => showAssetsList(a)} key={"AssetQuantityView_wrapper" + ind}>
                                        <AssetQuantityView
                                            key={"AssetQuantityView+" + ind}
                                            nomenclItemAndHisUUIDS={a}
                                            ind={ind + 1}

                                        />
                                    </div>)

                            }
                        </div>

                    </div>
                    : false
                }
                {assetsList&& selectedStore
                    ?<AssetsList n={assetsList} close={()=>setAssetsList(null)} store={selectedStore}/>
                    :false
                }

            </div>
        );
    }
    return (<div/>)
};

export default StoreBalanceView;