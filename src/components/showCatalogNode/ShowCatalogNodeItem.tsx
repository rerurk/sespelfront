import React, {FC} from 'react';
import {CatalogItem, CatalogNode} from "../../structs/catalog";
// @ts-ignore
import cl from "./ShowCatalogNode.module.css"
import {useDispatch} from "react-redux";
import {SetShowCatalogState} from "../../store/action_creator/showCatalogNode";
import {Masks} from "../../masks/Masks";
import {useNavigate} from "react-router-dom";

import {RouterPath} from "../../router";

interface ShowCatalogItemProps {
    item: CatalogItem
    parentItem:CatalogItem|null

}

const ShowCatalogNodeItem: FC<ShowCatalogItemProps> = ({item,parentItem}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onCatalogClick = () => {

        let catalogNode: CatalogNode = {
            parent:parentItem,
            self: item
        }
        // @ts-ignore
        dispatch(SetShowCatalogState(catalogNode))
    }

    if ((item.mask&Masks.CATALOG_MASK)==Masks.CATALOG_MASK) {
        return (
            <span className={cl.wrapper__catalog} onClick={onCatalogClick}>{item.name}</span>

        );
    }
    return (
        <span className={cl.wrapper__catalog__item} onClick={()=>navigate(RouterPath.SHOW_CATALOG_ITEM)}>{item.name}</span>
    )
};

export default ShowCatalogNodeItem;