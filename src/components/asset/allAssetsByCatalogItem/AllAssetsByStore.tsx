import React, {FC, useState} from 'react';
import {AssetsInStore} from "../../../structs/Asset";
// @ts-ignore
import cl from "./AllAssetsByCatalogItem.module.css";
import {CatalogItem, Item} from "../../../structs/catalog";
import AssetView from "./AssetView";
import {OnStoreDragEnter, OnStoreDragLive} from "../../../gragAndDrops/assets/assetsDrag";

interface AllAssetsByStoreProps {
    ais: AssetsInStore
    catalogItem: CatalogItem
}

const AllAssetsByStore: FC<AllAssetsByStoreProps> = ({ais, catalogItem}) => {

    const [isAssesHidden, setIsAssesHidden] = useState<boolean>(true)
    const [showClass, setShowClass] = useState<string[]>([cl.wrapper_storeAndAssets_assets, cl.wrapper_storeAndAssets_assets_hide])
    const onStoreNameClick = () => {
        if (isAssesHidden) {
            setShowClass([cl.wrapper_storeAndAssets_assets, cl.wrapper_storeAndAssets_assets_show])
        } else {
            setShowClass([cl.wrapper_storeAndAssets_assets, cl.wrapper_storeAndAssets_assets_hide])
        }
        setIsAssesHidden(!isAssesHidden)
    }

    const onDivDragEnter=(e:React.DragEvent<HTMLDivElement>)=>{
        console.log(e.target)
        e.currentTarget.classList.add(cl.wrapper_storeAndAssets_on_drag_enter)
        OnStoreDragEnter(ais.store)
    }

    const onDivDragLeave=(e:React.DragEvent<HTMLDivElement>)=>{
        console.log(e.target)
        e.currentTarget.classList.remove(cl.wrapper_storeAndAssets_on_drag_enter)
        OnStoreDragLive(ais.store)
    }

    return (
        <div
            className={cl.wrapper_storeAndAssets}
            key={"Store_name_" + ais.store.uuid}
            onClick={event => event.stopPropagation()}

        >
            <div
                className={cl.wrapper_storeAndAssets_storeName}
                onClick={onStoreNameClick}
                onDragEnter={event => onDivDragEnter(event)}
                onDragLeave={event=>onDivDragLeave(event)}
            >{ais.store.name}: {ais.assets.length} шт.
            </div>
            <div className={showClass.join(" ")}>
                {
                    ais.assets.map((as: Item, ind: number) => <AssetView name={catalogItem.name} asset={as}
                                                                         indexN={ind + 1}
                                                                         key={"asset_view_" + as.uuid}/>)
                }
            </div>
        </div>
    );
};

export default AllAssetsByStore;