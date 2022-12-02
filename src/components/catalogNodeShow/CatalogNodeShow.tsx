import React, {FC, memo, useEffect} from 'react';
// @ts-ignore
import cl from "./CatalogNodeShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";


import {CatalogItem} from "../../structs/catalog";
import CatalogNodeShowItem from "./CatalogNodeShowItem";
import CatalogMenu from "../catalogMenu/CatalogMenu";


interface ShowCatalogNodeProps {

}

const CatalogNodeShow: FC<ShowCatalogNodeProps> =() => {

    const {currentShowCatalog} = useTypeSelector(state => state.showCatalogNode)

    const onBackClick = () => {

        if (currentShowCatalog.parent && currentShowCatalog.parent.callShow) {
            currentShowCatalog.parent.callShow()
        }
    }



    return (
        <div className={cl.wrapper}>
            {/*Наименование каталога*/}
            <div className={cl.wrapper__self_name} >
                <button onClick={onBackClick}>назад</button>
                <CatalogMenu catalogItem={currentShowCatalog} isVisible={true}/>
                <strong>{currentShowCatalog.name}</strong>
            </div>
            {currentShowCatalog.items
                ? currentShowCatalog.items.map((it: CatalogItem) => <CatalogNodeShowItem item={it}
                                                                                  key={"SHOWC" + it.ref}/>)
                : false
            }
        </div>
    );


};

export default CatalogNodeShow;