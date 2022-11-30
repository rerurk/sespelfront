import React, {FC} from 'react';
import {CatalogItem} from "../../structs/catalog";
// @ts-ignore
import cl from "./CatalogNodeShow.module.css"


import {Masks} from "../../masks/Masks";
import {useNavigate} from "react-router-dom";

import {RouterPath} from "../../router";
import {useDispatch} from "react-redux";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";


interface ShowCatalogItemProps {
    item: CatalogItem


}

const CatalogNodeShowItem: FC<ShowCatalogItemProps> = ({item}) => {

    const navigate = useNavigate();
    const dispatch=useDispatch()

    const onCatalogClick=()=>{
        // @ts-ignore
        dispatch(SetCurrentCatalogState({item:item,items:null}))
    }

    if ((item.mask & Masks.CATALOG_MASK) == Masks.CATALOG_MASK) {
        return (
            <span key={"CatalogNode" + item.ref} className={cl.wrapper__catalog} onClick={onCatalogClick}>{item.name}</span>

        );
    }
    if ((item.mask & Masks.CATALOG_ITEM_MASK) == Masks.CATALOG_ITEM_MASK) return (
        <span key={item.ref} className={cl.wrapper__catalog__item}
              onClick={() => navigate(RouterPath.SHOW_CATALOG_ITEM)}>{item.name}</span>
    )
    return (<div/>)

};

export default CatalogNodeShowItem;