import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css";
import Address, {GetAddress, TAddress} from "../UI/address/Address";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {StoreAssets, UpdStore} from "../../structs/StoreAssets";

import {Fetches} from "../../fetches/Fetches";

import CreateNewStore from "./CreateNewStore";
import {CheckStoreFields} from "./chekStroreAssetsFields";
// для изменения
let hisAssetStore:StoreAssets

export let EmptyField: string = "Не заданно"

const StoreView: FC = () => {

    const {currentStore} = useTypeSelector(state => state.showCatalogNode)
    // если новый обьект то снимаем защиту от изменения
    const [isDisable,setIsDisable]=useState<boolean>(false)

    useEffect(()=>{
        if (currentStore && currentStore.item.id>0){
            setIsDisable(true)
        }

        if (currentStore && currentStore.item.id<0){
            setIsDisable(false)
        }

    },[currentStore])


    hisAssetStore=JSON.parse(JSON.stringify(currentStore))

    const onChangeName=(e:React.ChangeEvent<HTMLInputElement>)=>{
        hisAssetStore.item.name=e.target.value

    }
    const onMakeNewStore=()=>{
        hisAssetStore.address=GetAddress()

        if(CheckStoreFields(hisAssetStore)){
            Fetches.MakeNewStore(hisAssetStore).then(r=>console.log(r))
        }else {
            window.alert("Данные не корректны")
        }

    }

    const saveChanges = () => {

        hisAssetStore.address=GetAddress()

        if (currentStore && JSON.stringify(currentStore) != JSON.stringify(hisAssetStore)) {
            hisAssetStore.address=GetAddress()
            let upd:UpdStore={
                 store_before:JSON.parse(JSON.stringify(currentStore)),
                 store_upd:hisAssetStore

             }

             if(CheckStoreFields(upd.store_upd)){
                 Fetches.UpdStore(upd).then(r=>console.log(r))
             }else {
                 window.alert("Данные ....")
             }

        }
        setIsDisable(!isDisable)
    }
    const onBtChaneClick = () => {
        setIsDisable(!isDisable)
    }

    if (currentStore) {

        return (
            <div className={cl.wrapper_store_fields}>


                <div className={cl.wrapper_wrapper_store_name}>
                    <label>Наимен</label>
                    <input onChange={onChangeName} defaultValue={currentStore.item.name} key={"StoreView_name_"+currentStore.item.uuid} disabled={isDisable}/>
                </div>
                <Address key={"address_"+currentStore.item.uuid} address={currentStore.address} isDisable={isDisable} keyPref={currentStore.item.uuid}/>
                {currentStore.item.id<1
                    ?<button className={cl.wrapper_make_new_assetStore_bt} onClick={onMakeNewStore}>Сохранить новое</button>
                    :false
                }
                {
                    !isDisable
                        ? currentStore.item.id>0?<button onClick={()=>saveChanges()}>Сохранить изменения</button>:false
                        : currentStore.item.id>0?<button onClick={onBtChaneClick}>Изменить</button>:false
                }

                <CreateNewStore/>

            </div>
        );
    }
    return (<div/>)
};

export default StoreView;