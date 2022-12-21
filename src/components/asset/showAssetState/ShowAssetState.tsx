import React, {FC} from 'react';
// @ts-ignore
import cl from "./ShowAssetState.module.css"
import {useTypeSelector} from "../../../hooks/useTypeSelector";

import {StoresText} from "../../../texts/Texts";
interface ShowAssetProps {
    assetUUID:string|null
}

const ShowAssetState:FC<ShowAssetProps> = ({assetUUID}) => {

    /*TODO обработать если товар не найден*/
    const {currentAssetAndStore} = useTypeSelector(state => state.appReducer)

    if (currentAssetAndStore && currentAssetAndStore.current_store.id>0) {

        return (
            <div className={cl.wrapper}>
                <div >{StoresText.CurrentCatalogName}: {currentAssetAndStore.catalog_item.name}</div>
                <div >{StoresText.CurrentStore}: {currentAssetAndStore.current_store.name}</div>

            </div>
        );
    }
    return (<div>
        <label>товар не найден</label>
    </div>)
};

export default ShowAssetState;