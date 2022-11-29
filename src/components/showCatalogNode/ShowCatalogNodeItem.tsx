import React, {FC} from 'react';
import {CatalogItem} from "../../structs/catalog";
// @ts-ignore
import cl from "./ShowCatalogNode.module.css"


import {Masks} from "../../masks/Masks";
import {useNavigate} from "react-router-dom";

import {RouterPath} from "../../router";


interface ShowCatalogItemProps {
    item: CatalogItem


}

const ShowCatalogNodeItem: FC<ShowCatalogItemProps> = ({item}) => {

    const navigate = useNavigate();


    if ((item.mask&Masks.CATALOG_MASK)==Masks.CATALOG_MASK) {
        return (
            <span key={"CatalogNode"+item.ref} className={cl.wrapper__catalog}  >{item.name}</span>

        );
    }
    return (
        <span key={item.ref} className={cl.wrapper__catalog__item} onClick={()=>navigate(RouterPath.SHOW_CATALOG_ITEM)}>{item.name}</span>
    )
};

export default ShowCatalogNodeItem;