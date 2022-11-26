import React, {useEffect} from 'react';
import CatalogTree from "../../components/catalogTree/CatalogTree";
import {GetItems} from "../../gragAndDrops/catalog/catalog";
import {AddToItem, ReplacesCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


const SetCatalog = () => {
    const onBtPress = () => {
        let replaceCatalogItem: ReplacesCatalogItem | null = GetItems()
        if (replaceCatalogItem) {
            Fetches.ReplaceCatalogItem(replaceCatalogItem)
                .then(r => {

                    console.log(r.status)
                })
        } else {
            console.log("НичО нЭт")
        }

    }
    return (
        <div>
            <CatalogTree/>
            <button onMouseUp={onBtPress}>Сохранить</button>
        </div>
    );
};

export default SetCatalog;