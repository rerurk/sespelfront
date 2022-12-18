import React, {FC} from 'react';
// @ts-ignore
import cl from "./CatalogShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";


import {CatalogItem, Item} from "../../structs/catalog";
import CatalogItemView from "./CatalogItemView";
import CatalogMenu from "../catalogMenu/CatalogMenu";


interface ShowCatalogNodeProps {

}

const CatalogItemsShow: FC<ShowCatalogNodeProps> = () => {

    const {currentCatalog} = useTypeSelector(state => state.showCatalogNode)

    const onBackClick = () => {

        if (currentCatalog?.ownerItem && currentCatalog.ownerItem.callShow) {
            currentCatalog.ownerItem.callShow()
        }
    }

    if (currentCatalog) {

        return (
            <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
                {/*Наименование каталога*/}
                <div className={cl.wrapper__self_name}>
                    <button onClick={onBackClick}>назад</button>
                    <strong>{currentCatalog.name}</strong>
                    <CatalogMenu catalogItem={currentCatalog} isVisible={true}/>
                </div>
                {currentCatalog.items
                    ? currentCatalog.items.map((it: CatalogItem) => <CatalogItemView item={it}
                                                                                     key={"SHOWC" + it.uuid}/>)
                    : false
                }
            </div>
        );
    }
    return (<div/>)


};

export default CatalogItemsShow;