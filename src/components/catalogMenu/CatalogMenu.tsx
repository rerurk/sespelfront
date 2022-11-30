import React, {FC, useState} from 'react';

// @ts-ignore
import cl from "./CatalogMenu.module.css"


import MenuItems from "./MenuItems";
import {Menu, MenuAction, selectAction} from "./menuActions";
import {useDispatch} from "react-redux";

import {CatalogItem} from "../../structs/catalog";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";

interface CatalogMenuProps {
    catalogItem:CatalogItem
    isVisible:boolean
}

const CatalogMenu: FC<CatalogMenuProps> = ({catalogItem,isVisible}) => {
    const dispatch = useDispatch()
    const [itemsClass, setItemsClass] = useState<string>(cl.items_hide)
    const onItemClick = (menuAction: MenuAction) => {
        menuAction.payload = catalogItem
        // @ts-ignore
        selectAction(menuAction)
            .then(r => {
                    if (!(r instanceof Error)) {

                        // @ts-ignore
                        dispatch(SetCurrentCatalogState({item:catalogItem,items:null}))
                    }
                }
            )
        hideItems()
    }
    const onMainClick = () => {
        setItemsClass(cl.items_show)

    }
    const hideItems = () => {
        setItemsClass(cl.items_hide)
    }
    if(isVisible){
    return (
        <div onClick={event => event.stopPropagation()} onMouseLeave={hideItems}>
            <div className={cl.wrapper} onClick={onMainClick}>&#8801;</div>

            {Object.keys(Menu).length > 0
                ? <MenuItems hisCssClass={itemsClass} onItemClick={onItemClick}/>
                : false

            }
        </div>
    );}
    return <div/>
};

export default CatalogMenu;