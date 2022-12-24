import React, {FC, useEffect, useState} from 'react';
import {NomenclatureItem,} from "../../../structs/nomenclature";
import {Fetches} from "../../../fetches/Fetches";
import {AssetsInStore} from "../../../structs/Asset";
// @ts-ignore
import cl from "./AllAssetsByCatalogItem.module.css"

import AllAssetsByStore from "./AllAssetsByStore";

interface AllAssetsByCatalogItemProps {
    // наименование ТМЦ в каталоге
    catalogItem: NomenclatureItem
}

const AllAssetsByCatalogItem: FC<AllAssetsByCatalogItemProps> = ({catalogItem}) => {

    const [allCatalogItemAssets, setAllCatalogItemAssets] = useState<AssetsInStore[] | null>(null)
    useEffect(() => {
        // тут получим через фетч все ТМЦ с этим наименоавпнием

    }, [catalogItem])
    if (allCatalogItemAssets) {
        return (
            <div className={cl.wrapper}>
                {
                    allCatalogItemAssets.map((ais: AssetsInStore) =><AllAssetsByStore ais={ais} catalogItem={catalogItem} key={"AllAssetsByStore_"+ais.store.uuid}/>)
                }

            </div>
        );
    }
    return (<div/>)
};

export default AllAssetsByCatalogItem;