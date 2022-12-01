import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./CatalogNodeShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";

import {CatalogItem} from "../../structs/catalog";
import CatalogNodeShowItem from "./CatalogNodeShowItem";
import CatalogMenu from "../catalogMenu/CatalogMenu";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";
import {json} from "stream/consumers";
import {Masks} from "../../masks/Masks";

interface ShowCatalogNodeProps {

}

const CatalogNodeShow: FC<ShowCatalogNodeProps> = () => {

    const {currentItem,items} = useTypeSelector(state => state.showCatalogNode)

    const dispatch = useDispatch()


    const onBackClick = () => {
        if (currentItem.parent) {
             // @ts-ignore
            dispatch(SetCurrentCatalogState({item:currentItem.parent,items:null}))
        }
    }

    return (
        <div className={cl.wrapper}>
            {/*Наименование каталога*/}
            <div className={cl.wrapper__self_name}>
                <button onClick={onBackClick}>назад</button>
                <CatalogMenu catalogItem={currentItem} isVisible={true}/>
                <strong>{currentItem.name}</strong>
            </div>
            {currentItem.items
                ? currentItem.items.map((it: CatalogItem) => <CatalogNodeShowItem item={it}
                                                                                  key={"SHOWC" + it.ref}/>)
                : false
            }
        </div>
    );


};

export default CatalogNodeShow;