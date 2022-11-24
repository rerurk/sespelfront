import React, {FC} from 'react';
// @ts-ignore
import cl from"./CatalogMenu.module.css"
import {CatalogItem} from "../../structs/catalog";
interface CatalogMenuProps {
    onMenuClick:()=>void
}
const CatalogMenu :FC<CatalogMenuProps> = ({onMenuClick}) => {


    return (
        <div   onClick={event => event.stopPropagation() }>
            <div className={cl.wrapper} onClick={onMenuClick}>&#8801;</div>

        </div>
    );
};

export default CatalogMenu ;