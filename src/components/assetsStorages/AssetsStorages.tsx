import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./AssetsStorages.module.css"

import {useTypeSelector} from "../../hooks/useTypeSelector";
import CreateNewStorage from "./CreateNewStorage";

let showNewStoreClass: string = cl.hidden
let btCancelClass:string=cl.hidden

const AssetsStorages: FC = () => {

    const {mainAssetStore} = useTypeSelector(state => state.showCatalogNode)
    const [newStoreShow, setNewStoreShow] = useState<boolean>(false)

    if(newStoreShow){
        showNewStoreClass = cl.wrapper_CreateNewStorage
        btCancelClass=""
    } else {

        showNewStoreClass =cl.hidden
        btCancelClass=cl.hidden
    }
    const onBtCreateNewClick = () => {

       setNewStoreShow(()=>!newStoreShow)


    }

    return (
        <div className={cl.wrapper}>
            <button onClick={() => onBtCreateNewClick()}>Создать склад</button>
            <CreateNewStorage classN={showNewStoreClass}/>
            <button className={btCancelClass} onClick={()=>onBtCreateNewClick()}>назад</button>
        </div>
    );
};

export default AssetsStorages;