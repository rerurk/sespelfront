import React, {FC, useEffect} from 'react';
// @ts-ignore
import cl from "./ShowAsset.module.css"
import {useTypeSelector} from "../../../hooks/useTypeSelector";

import {StoresText} from "../../../texts/Texts";
import {Tools} from "../../../tools/Tools";
interface ShowAssetProps {
    assetUUID:string|null
}

const ShowAsset:FC<ShowAssetProps> = ({assetUUID}) => {
    /*TODO обработать если товар не найден*/
    const {currentAssetAndStore} = useTypeSelector(state => state.showCatalogNode)

    if (currentAssetAndStore) {
        return (
            <div className={cl.wrapper}>

                <div >{StoresText.CurrentCatalogName}: {currentAssetAndStore.catalog_item.name}</div>
                <div >{StoresText.CurrentStore}: {currentAssetAndStore.current_store.name}</div>

            </div>
        );
    }
    return (<></>)
};

export default ShowAsset;