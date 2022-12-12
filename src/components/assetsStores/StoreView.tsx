import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css";
import Address, {TAddress} from "../UI/address/Address";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {StoreAssets} from "../../structs/StoreAssets";

const StoreView: FC = () => {
    const {currentStore} = useTypeSelector(state => state.showCatalogNode)

    const getAddress = (address: TAddress) => {
        let changeSt:StoreAssets=JSON.parse(JSON.stringify(currentStore))
        changeSt.address=address
        if(currentStore && JSON.stringify(currentStore)!=JSON.stringify(changeSt)){
             console.log("есть изменения надо сохранить")
        }

    }
    if(currentStore!=null) {
        return (
            <div className={cl.wrapper_store_fields}>
                <div className={cl.wrapper_wrapper_store_name}>
                    <span>Наименование:</span>
                    <textarea defaultValue={currentStore.item.name}></textarea>
                </div>
                {currentStore
                    ? <Address address={currentStore.address} getAddress={getAddress}/>
                    : false
                }
            </div>
        );
    }
    return (<div/>)
};

export default StoreView;