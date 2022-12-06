import React, {FC, useState} from 'react';

// @ts-ignore
import cl from "./CatalogMenu.module.css"


import MenuItems from "./MenuItems";
import {Menu, MenuAction, selectAction} from "./menuActions";


import {CatalogItem} from "../../structs/catalog";


interface CatalogMenuProps {
    catalogItem:CatalogItem
    isVisible:boolean

}

const CatalogMenu: FC<CatalogMenuProps> = ({catalogItem,isVisible}) => {

    const [itemsClass, setItemsClass] = useState<string>(cl.items_hide)
    const onItemClick = (menuAction: MenuAction) => {
        menuAction.payload = catalogItem
        // @ts-ignore
        selectAction(menuAction)
            .then(r => {
                console.log("RESPONSE",r)
                    if (!(r instanceof Error)) {
                       if(catalogItem.callReBoot){
                           catalogItem.callReBoot()
                       }

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