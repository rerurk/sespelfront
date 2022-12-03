
/* Фильтр для отсечения не каталогов*/
import React, {FC} from 'react';
import {CatalogItem} from "../../structs/catalog";
import {Masks} from "../../masks/Masks";
import TreeNode from "./TreeNode";

interface FilterNodeProps  {
    item:CatalogItem
}

const FilterNode:FC<FilterNodeProps> = ({item}) => {
    if((item.mask & Masks.CATALOG_MASK) == Masks.CATALOG_MASK){
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