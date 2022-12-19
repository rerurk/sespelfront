
/* Фильтр для отсечения не каталогов*/
import React, {FC} from 'react';
import {NomenclatureItem, Item} from "../../structs/nomenclature";

import CatalogTree from "./CatalogTree";
import {AppItemMasks} from "../../App";


interface FilterNodeProps  {
    item:NomenclatureItem
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