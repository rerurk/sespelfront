import React, {FC} from 'react';
import {Item} from "../../structs/catalog";
import {AppItemMasks} from "../../App";
import {TAddress} from "../UI/address/Address";
import {StoreAssets} from "../../structs/StoreAssets";
import {useDispatch} from "react-redux";
import {SetAssetsStore} from "../../store/action_creator/CatalogStoreActions";
import {EmptyField} from "./StoreView";
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./AssetsStores.module.css";

const CreateNewStore:FC = () => {
    const {currentStore} = useTypeSelector(state => state.showCatalogNode)
    const dispatch=useDispatch()
    const  onCreateNewStore=()=>{
        let storeItem:Item={
            id: -1,
            items: null,
            mask: AppItemMasks.STORE_MASK,
            name: EmptyField,
            owner: null,
            uuid: ""}
        let storeAddress:TAddress={
            building: "",
            city: "",
            district: "",
            phone: "",
            reg_ind: "",
            region: "",
            street: ""
        }
        let newStore:StoreAssets= {
            item:storeItem,
            address:storeAddress
        }
        // @ts-ignore
        dispatch(SetAssetsStore(newStore))

    }
    if (currentStore && currentStore.item.id>0) {
        return (

            <button className={cl.wrapper_create_new_assetStore_bt} onClick={onCreateNewStore}>Создать хранилище</button>
        );
    }else {
        return (<div/>)
    }
};

export default CreateNewStore;