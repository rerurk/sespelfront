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

    const {currentCatalog} = useTypeSelector(state => state.showCatalogNode)

    const onBackClick = () => {

        if (currentCatalog.parent && currentCatalog.parent.callShow) {
            currentCatalog.parent.callShow()
        }
    }



    return (
        <div className={cl.wrapper}>
            {/*Наименование каталога*/}
            <div className={cl.wrapper__self_name} >
                <button onClick={onBackClick}>назад</button>
                <CatalogMenu catalogItem={currentCatalog} isVisible={true}/>
                <strong>{currentCatalog.name}</strong>
            </div>
            {currentCatalog.items
                ? currentCatalog.items.map((it: CatalogItem) => <CatalogNodeShowItem item={it}
                                                                                  key={"SHOWC" + it.ref}/>)
                : false
            }
        </div>
    );


};

export default CatalogNodeShow;