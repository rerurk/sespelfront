
/* Фильтр для отсечения не каталогов*/
import React, {FC} from 'react';
import {CatalogItem, Item} from "../../structs/catalog";

import CatalogTree from "./CatalogTree";
import {AppItemMasks} from "../../App";


interface FilterNodeProps  {
    item:CatalogItem
}

const FilterNode:FC<FilterNodeProps> = ({item}) => {
    if((item.mask & AppItemMasks.CATALOG_MASK) == AppItemMasks.CATALOG_MASK){
        return (
            <CatalogTree item={item}/>
        );
    }
    return (
        <>
        </>
    );
};

export default FilterNode;