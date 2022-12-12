import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css";
import Address, {GetAddress, TAddress} from "../UI/address/Address";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {StoreAssets, UpdatingStore} from "../../structs/StoreAssets";
import {json} from "stream/consumers";
import {Fetches} from "../../fetches/Fetches";

let updAssetStore:StoreAssets

const StoreView: FC = () => {
    const {currentStore} = useTypeSelector(state => state.showCatalogNode)
    const [isDisable,setIsDisable]=useState<boolean>(true)
    updAssetStore=JSON.parse(JSON.stringify(currentStore))
    const onChangeName=(e:React.ChangeEvent<HTMLInputElement>)=>{
        updAssetStore.item.name=e.target.value
    }

    const saveChanges = () => {

        updAssetStore.address=GetAddress()

        if (currentStore && JSON.stringify(currentStore) != JSON.stringify(updAssetStore)) {
             let upd:UpdatingStore={
                 store_before:JSON.parse(JSON.stringify(currentStore)),
                 store_upd:updAssetStore
             }
             Fetches.UpdStore(upd).then(r=>console.log(r))
        }
        setIsDisable(!isDisable)
    }
    const onBtChaneClick = () => {
        setIsDisable(!isDisable)
    }
    if (currentStore != null) {
        return (
            <div className={cl.wrapper_store_fields}>
                <div className={cl.wrapper_wrapper_store_name}>
                    <span>Наименование:</span>
                    <input defaultValue={currentStore.item.name} disabled={isDisable} onChange={event => onChangeName(event)}/>
                </div>
                <Address address={currentStore.address}  isDisable={isDisable}/>
                {
                    !isDisable
                        ? <button onClick={()=>saveChanges()}>Сохранить</button>
                        : <button onClick={onBtChaneClick}>Изменить</button>
                }
            </div>
        );
    }
    return (<div/>)
};

export default StoreView;