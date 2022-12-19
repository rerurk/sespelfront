import {Item} from "./nomenclature";

export type NewAsset = {
    asset_catalog_item: Item
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
