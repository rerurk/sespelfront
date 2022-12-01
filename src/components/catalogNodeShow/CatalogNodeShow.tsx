import React, {FC, useEffect} from 'react';
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

    useEffect(()=>{

        if (currentItem.id>0 && items===null){

            Fetches.GetCatalogItems(currentItem).then(res=>{

              if (res&&!(res instanceof Error)){
                    console.log("const CatalogNodeShow: Fetch items:",res)
                  res.map((it:CatalogItem)=>it.parent=currentItem)

                  // @ts-ignore
                  dispatch(SetCurrentCatalogState({item:currentItem,items:res}))
              }
            })
        }

    },[currentItem])

    const onBackClick = () => {
        if (currentItem.parent) {
             // @ts-ignore
            dispatch(SetCurrentCatalogState({item:currentItem.parent,items:null}))
        }
    }
    console.log("CatalogNodeShow: render, item:",currentItem)
    return (
        <div className={cl.wrapper}>
            {/*Наименование каталога*/}
            <div className={cl.wrapper__self_name}>
                <button onClick={onBackClick}>назад</button>
                <CatalogMenu catalogItem={currentItem} isVisible={(currentItem.mask&Masks.NON_REMOVABLE)!==Masks.NON_REMOVABLE}/>
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