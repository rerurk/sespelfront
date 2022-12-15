import React, {FC} from 'react';
// @ts-ignore
import cl from "./CatalogNodeShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";


import {CatalogItem, Item} from "../../structs/catalog";
import CatalogNodeShowItem from "./CatalogNodeShowItem";
import CatalogMenu from "../catalogMenu/CatalogMenu";


interface ShowCatalogNodeProps {

}

const CatalogNodeShow: FC<ShowCatalogNodeProps> = () => {

    const {currentCatalog} = useTypeSelector(state => state.showCatalogNode)

    const onBackClick = () => {

        if (currentCatalog?.ownerItem && currentCatalog.ownerItem.callShow) {
            currentCatalog.ownerItem.callShow()
        }
    }

    if (currentCatalog) {

        return (
            <div className={cl.wrapper}>
                {/*Наименование каталога*/}
                <div className={cl.wrapper__self_name}>
                    <button onClick={onBackClick}>назад</button>
                    <strong>{currentCatalog.name}</strong>
                    <CatalogMenu catalogItem={currentCatalog} isVisible={true}/>
                </div>
                {currentCatalog.items
                    ? currentCatalog.items.map((it: CatalogItem) => <CatalogNodeShowItem item={it}
                                                                                  key={"SHOWC" + it.uuid}/>)
                    : false
                }
            </div>
        );
    }
    return (<div/>)


};

export default CatalogNodeShow;