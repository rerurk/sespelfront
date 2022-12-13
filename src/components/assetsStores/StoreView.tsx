import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css";
import Address, {GetAddress, TAddress} from "../UI/address/Address";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {StoreAssets, UpdStore} from "../../structs/StoreAssets";

import {Fetches} from "../../fetches/Fetches";

import CreateNewStore from "./createNewStore";
import {CheckStoreFields} from "./chekStroreAssets";
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
        console.log(hisAssetStore)
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
             console.log(upd)
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

    if (currentStore != null) {

        return (

            <div className={cl.wrapper_store_fields}>
                <CreateNewStore/>
                {currentStore.item.id<1
                    ?<button className={cl.wrapper_make_new_assetStore_bt} onClick={onMakeNewStore}>Сохранить новое</button>
                    :false
                }
                <div className={cl.wrapper_wrapper_store_name}>
                    <span>Наименование:</span>
                    <input key={"name_"+currentStore.item.sys_id} defaultValue={currentStore.item.name}  disabled={isDisable} onChange={event => onChangeName(event)}/>
                </div>
                <Address key={"address_"+currentStore.item.sys_id} address={currentStore.address}  isDisable={isDisable} keyPref={currentStore.item.sys_id}/>
                {
                    !isDisable
                        ? currentStore.item.id>0?<button onClick={()=>saveChanges()}>Сохранить изменения</button>:false
                        : currentStore.item.id>0?<button onClick={onBtChaneClick}>Изменить</button>:false
                }



            </div>
        );
    }
    return (<div/>)
};

export default StoreView;