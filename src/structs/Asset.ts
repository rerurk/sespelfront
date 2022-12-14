import {Item} from "./catalog";

export type NewAsset = {
    asset_catalog_item: Item
    asset:Item
}

export type AssetsInStore ={
    store:Item
    assets:Item[]
}