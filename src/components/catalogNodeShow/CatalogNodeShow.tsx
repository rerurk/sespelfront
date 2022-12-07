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

        if (currentCatalog.owner && currentCatalog.owner.callShow) {
            currentCatalog.owner.callShow()
        }
    }



    return (
        <div className={cl.wrapper}>
            {/*Наименование каталога*/}
            <div className={cl.wrapper__self_name} >
                <button onClick={onBackClick}>назад</button>
                <strong>{currentCatalog.name}</strong>
                <CatalogMenu catalogItem={currentCatalog} isVisible={true}/>
            </div>
            {currentCatalog.items
                ? currentCatalog.items.map((it: CatalogItem) => <CatalogNodeShowItem item={it}
                                                                                  key={"SHOWC" + it.sys_id}/>)
                : false
            }
        </div>
    );


};

export default CatalogNodeShow;