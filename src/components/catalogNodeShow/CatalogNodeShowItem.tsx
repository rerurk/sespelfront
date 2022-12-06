import React, {FC} from 'react';
import {CatalogItem} from "../../structs/catalog";
// @ts-ignore
import cl from "./CatalogNodeShow.module.css"

import {Masks} from "../../masks/Masks";
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";
import {useDispatch} from "react-redux";
import {SetCurrentCatalogItemState} from "../../store/action_creator/CatalogStoreActions";
import {Menu, MenuAction, selectAction} from "../catalogMenu/menuActions";


interface ShowCatalogItemProps {
    item: CatalogItem


}

const CatalogNodeShowItem: FC<ShowCatalogItemProps> = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onCatalogClick = () => {
        if (item.callShow) {

            item.callShow()

        }

    }

    const onProductNameClick = () => {
        // @ts-ignore
        dispatch(SetCurrentCatalogItemState(item))
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

    const onBtRemoveClick=()=>{
         let menuAction:MenuAction=
             {
                 type:Menu.REMOVE,
                 payload:item
             }
             selectAction(menuAction).then(r=>{

                 if (!(r instanceof Error)){
                     if(item.owner && item.owner.callReBoot){
                         item.owner.callReBoot()

                     }
                 }
             })
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
        <div onClick={e=>{e.stopPropagation();onProductNameClick()}}  className={cl.wrapper__catalog__item}>
            <button onClick={e=>{e.stopPropagation();onBtRemoveClick()}}>x</button>
        <span

            draggable={true}
            onDrag={() => onItemDrag(item)}
            onDragEnd={onProductNameDragEnd}
            key={"CatalogNode" + item.ref}



        >{item.name}</span>

        </div>
    )
    return (<div/>)

};

export default CatalogNodeShowItem;