import React, {FC, useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./StoreBalanceView.module.css"
import StoreTree from "../../components/stores/storeTree/StoreTree";
import {Fetches} from "../../fetches/Fetches";
import {Tools} from "../../tools/Tools";
import {StoreBalance} from "../../structs/storesTypes";
import {AssetQuantity} from "../../structs/Asset";
import AssetQuantityView from "../../components/assetQuantityView/AssetQuantityView";


const StoreBalanceView: FC = () => {
    const {storeGroupRoot, selectedStoreGroup, selectedStore} = useTypeSelector(state => state.appReducer)
    const [storeBalance, setStoreBalance] = useState<StoreBalance | null>(null)
    useEffect(() => {
        setStoreBalance(null)
    }, [selectedStoreGroup, selectedStore])
    const onShowBalanceClick = () => {
        if (selectedStore) {

            Fetches.GetStoreBalance(Tools.unRefCatalogItem(selectedStore)).then(r => {
                if (!(r instanceof Error)) {

                    if (r.assets && r.assets.length > 0) {
                        setStoreBalance(() => r)
                    }

                }
            })
        }
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
                    ? <div className={cl.wrapper_storeBalance}>

                        <span> СКЛАД:{storeBalance.store.name} </span>
                        <div className={cl.wrapper_storeBalance_close} onClick={()=>setStoreBalance(null)}>x</div>
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
                                storeBalance.assets.map((aq: AssetQuantity, ind) => <AssetQuantityView
                                    key={"AssetQuantityView+" + ind} assetQuantity={aq} ind={ind+1}/>)
                            }
                        </div>

                    </div>
                    : false
                }

            </div>
        );
    }
    return (<div/>)
};

export default StoreBalanceView;