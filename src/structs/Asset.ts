import {Item} from "./App";


export type NewAsset = {
    asset_nomenclature_item: Item
    asset_store:Item
    asset:Item

}

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
}
export type AssetQrCode ={
    code:string
    assetCatalogName:string
}
