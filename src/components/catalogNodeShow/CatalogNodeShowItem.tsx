import React, {FC} from 'react';
import {CatalogItem} from "../../structs/catalog";
// @ts-ignore
import cl from "./CatalogNodeShow.module.css"


import {Masks} from "../../masks/Masks";
import {useNavigate} from "react-router-dom";

import {RouterPath} from "../../router";
import {useDispatch} from "react-redux";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";
import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";


interface ShowCatalogItemProps {
    item: CatalogItem


}

const CatalogNodeShowItem: FC<ShowCatalogItemProps> = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onCatalogClick = () => {
        // @ts-ignore
        dispatch(SetCurrentCatalogState({item: item, items: null}))
    }
    const onProductNameClick = () => {


        navigate(RouterPath.SHOW_CATALOG_ITEM)

    }
    const onDragEnterToItem = (e: React.MouseEvent<HTMLSpanElement>) => {

        e.currentTarget.classList.add(cl.wrapper__catalog_drag_enter)
        OnItemDragEnter(item)
    }

    const onDragLeaveFromItem = (e: React.MouseEvent<HTMLSpanElement>) => {

        e.currentTarget.classList.remove(cl.wrapper__catalog_drag_enter)
        OnItemDragEnter(item)
    }

    function onProductNameDragEnd() {

        ConfirmReplace().then(r => {
            if (!(r instanceof Error)) {

            }
        })
    }


    if ((item.mask & Masks.CATALOG_MASK) == Masks.CATALOG_MASK) {
        return (
            <span
                key={"CatalogNode" + item.ref}
                className={cl.wrapper__catalog}
                onClick={onCatalogClick}
                draggable={true}
                onDrag={() => onItemDrag(item)}
                onDragEnter={(e) => onDragEnterToItem(e)}
                onDragLeave={e => onDragLeaveFromItem(e)}
                onDragEnd={ConfirmReplace}
            >{item.name}</span>

        );
    }
    if ((item.mask & Masks.CATALOG_ITEM_MASK) == Masks.CATALOG_ITEM_MASK) return (
        <span
            draggable={true}
            onDrag={() => onItemDrag(item)}
            onDragEnd={onProductNameDragEnd}
            key={"CatalogNode" + item.ref}
            className={cl.wrapper__catalog__item}
            onClick={() => onProductNameClick()}

        >{item.name}</span>
    )
    return (<div/>)

};

export default CatalogNodeShowItem;