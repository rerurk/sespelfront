import React, {FC, useEffect, useState} from 'react';
import {CatalogItem, Item} from "../../../structs/catalog";
import {Fetches} from "../../../fetches/Fetches";
import {AssetsInStore} from "../../../structs/Asset";
// @ts-ignore
import cl from "./AllAssetsByCatalogItem.module.css"
import AssetView from "./AssetView";

interface AllAssetsByCatalogItemProps {
    // наименование ТМЦ в каталоге
    catalogItem: CatalogItem
}

const AllAssetsByCatalogItem: FC<AllAssetsByCatalogItemProps> = ({catalogItem}) => {

    const [allCatalogItemAssets, setAllCatalogItemAssets] = useState<AssetsInStore[] | null>(null)
    useEffect(() => {
        Fetches.GetAssetsQuantity(catalogItem).then(r => {
                if (!(r instanceof Error)) {
                    setAllCatalogItemAssets(r)
                }
            }
        )
    }, [catalogItem])
    if (allCatalogItemAssets) {
        return (
            <div className={cl.wrapper}>
                {
                    allCatalogItemAssets.map((ais: AssetsInStore) =>
                        <div className={cl.wrapper_assInStore} key={"Store_name_"+ais.store.uuid}>
                            <div className={cl.wrapper_assInStore_storeName}>{ais.store.name}</div>
                            {
                                ais.assets.map((as: Item,ind:number) =>
                                    <AssetView name={catalogItem.name} asset={as}  indexN={ind+1} key={"asset_view_" + as.uuid}/>)
                            }
                        </div>)
                }

            </div>
        );
    }
    return (<div/>)
};

export default AllAssetsByCatalogItem;