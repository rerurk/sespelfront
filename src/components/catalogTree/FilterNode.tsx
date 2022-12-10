
/* Фильтр для отсечения не каталогов*/
import React, {FC} from 'react';
import {Item} from "../../structs/catalog";

import TreeNode from "./TreeNode";
import {AppItemMasks} from "../../App";


interface FilterNodeProps  {
    item:Item
}

const FilterNode:FC<FilterNodeProps> = ({item}) => {
    if((item.mask & AppItemMasks.CATALOG_MASK) == AppItemMasks.CATALOG_MASK){
        return (
            <TreeNode item={item}/>
        );
    }
    return (
        <>
        </>
    );
};

export default FilterNode;