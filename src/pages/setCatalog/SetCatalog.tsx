import React, {useEffect} from 'react';
import CatalogTree from "../../components/catalogTree/CatalogTree";
import {GetItems} from "../../gragAndDrops/catalog/catalog";
import {AddToItem, ReplaceCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


const SetCatalog = () => {
    const onBtPress = () => {
        let replaceCatalogItem: ReplaceCatalogItem | null = GetItems()
        if (replaceCatalogItem) {
            console.log(replaceCatalogItem)
            Fetches.ReplaceCatalogItem(replaceCatalogItem).then(r => console.log(r))
        } else {
            console.log("НичО нЭт")
        }

    }
    return (
        <div>
            <CatalogTree/>
            <button onClick={onBtPress}>Сохранить</button>
        </div>
    );
};

export default SetCatalog;