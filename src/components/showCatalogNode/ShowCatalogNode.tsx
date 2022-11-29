import React, {FC} from 'react';
// @ts-ignore
import cl from "./ShowCatalogNode.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";

import {CatalogItem} from "../../structs/catalog";
import ShowCatalogNodeItem from "./ShowCatalogNodeItem";
import CatalogMenu from "../catalogMenu/CatalogMenu";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";

interface ShowCatalogNodeProps {

}

const ShowCatalogNode: FC<ShowCatalogNodeProps> = () => {

    const {currentItem} = useTypeSelector(state => state.showCatalogNode)

    const dispatch = useDispatch()

    if (currentItem && currentItem.items) {
        Fetches.GetCatalogItems(currentItem).then(r=>)

    }

    const onBackClick = () => {
        console.log(currentItem)
        if (currentItem.parent) {
            // @ts-ignore
            dispatch(SetCurrentCatalogState(currentItem.parent))
        }
    }

    return (
        <div className={cl.wrapper}>
            {/*Наименование каталога*/}
            <div className={cl.wrapper__self_name}>
                <button onClick={onBackClick}>назад</button>
                <CatalogMenu catalogItem={currentItem}/>
                <strong>{currentItem.name}</strong>
            </div>
            {currentItem.items
                ? currentItem.items.map((it: CatalogItem) => <ShowCatalogNodeItem item={it}
                                                                                  key={"SHOWC" + it.ref}/>)
                : <span>ПУСТОЙ КАТАЛОГ</span>
            }
        </div>
    );


};

export default ShowCatalogNode;