import {Item} from "./App";


export type TMakeNewAsset = {
    asset_nomenclature_item: Item|null
    asset_store:Item|null

}

export type TAsset = {
    asset:Item
    store:Item
    nomenclature:Item
}


/*
export type AssetsInStore ={
    store:Item
    assets:Item[]
}


export type AssetAndStore ={
    current_store:Item
    catalog_item:Item
    asset:Item
}


export type AssetUUID ={
    uuid:string
}*/
export type AssetQrCode ={
    code:string
    assetCatalogName:string
}
