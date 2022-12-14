import React, {FC, useEffect} from 'react';
import {Item} from "../../../structs/catalog";
import {Fetches} from "../../../fetches/Fetches";
interface AllAssetsByCatalogItemProps {
    // наименование ТМЦ в каталоге
    catalogItem:Item
}

const AllAssetsByCatalogItem:FC<AllAssetsByCatalogItemProps> = ({catalogItem}) => {
    useEffect(()=>{
        Fetches.GetAssetsQuantity(catalogItem).then(r=>console.log(r))
    },[catalogItem])
    return (
        <div>
            <h1>{catalogItem.name}</h1>
        </div>
    );
};

export default AllAssetsByCatalogItem;