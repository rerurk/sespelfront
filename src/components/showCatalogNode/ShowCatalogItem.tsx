import React, {FC} from 'react';
import {CatalogItem, CatalogNode} from "../../structs/catalog";
// @ts-ignore
import cl from "./ShowCatalogNode.module.css"
import {useDispatch} from "react-redux";
import {SetShowCatalogState} from "../../store/action_creator/showCatalogNode";

interface ShowCatalogItemProps {
    item: CatalogItem
    parentItem:CatalogItem|null

}

const ShowCatalogItem: FC<ShowCatalogItemProps> = ({item,parentItem}) => {
    const dispatch = useDispatch()
    const onCatalogClick = () => {

        let catalogNode: CatalogNode = {
            parent:parentItem,
            self: item
        }
        // @ts-ignore
        dispatch(SetShowCatalogState(catalogNode))
    }

    if (item.is_table) {
        return (
            <span className={cl.wrapper__catalog} onClick={onCatalogClick}>{item.name}</span>

        );
    }
    return (
        <span className={cl.wrapper__catalog__item}>{item.name}</span>
    )
};

export default ShowCatalogItem;