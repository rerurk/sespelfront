import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./CatalogMenu.module.css"


import MenuItems from "./MenuItems";
import {Menu, MenuAction, selectAction} from "./menuActions";
import {CatalogNode} from "../../structs/catalog";

interface CatalogMenuProps {
    catalogNode: CatalogNode
}

const CatalogMenu: FC<CatalogMenuProps> = ({catalogNode}) => {
    const [itemsClass, setItemsClass] = useState<string>(cl.items_hide)
    const onItemClick = (menuAction: MenuAction) => {
        menuAction.payload = catalogNode
        selectAction(menuAction)
        hideItems()
    }
    const onMainClick = () => {
        setItemsClass(cl.items_show)

    }
    const hideItems = () => {
        setItemsClass(cl.items_hide)
    }
    return (
        <div onClick={event => event.stopPropagation()} onMouseLeave={hideItems}>
            <div className={cl.wrapper} onClick={onMainClick}>&#8801;</div>

            {Object.keys(Menu).length > 0
                ? <MenuItems hisCssClass={itemsClass} onItemClick={onItemClick}/>
                : false

            }
        </div>
    );
};

export default CatalogMenu;