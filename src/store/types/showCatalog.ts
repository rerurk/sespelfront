import {CatalogItem} from "../../structs/catalog";

export interface ShowCatalogState {
    currentItem:CatalogItem
    catalogRoot:CatalogItem|null
    catalogItems:CatalogItem[]|null
}
export enum ShowCatalogActionTypes {
    SET_STATE="SET_STATE",
    SET_CATALOG_ROOT='SET_CATALOG_ROOT',
    SET_CATALOG_ITEMS="SET_CATALOG_ITEMS"
}

interface  SetCurrentItemAction {
    type:ShowCatalogActionTypes.SET_STATE
    payload:CatalogItem
}

interface  SetCurrentItemItemsAction {
    type:ShowCatalogActionTypes.SET_CATALOG_ITEMS
    payload:CatalogItem[]
}

interface  SetCatalogRootAction {
    type:ShowCatalogActionTypes.SET_CATALOG_ROOT
    payload:CatalogItem
}
export type ShowCatalogAction=SetCurrentItemAction
|SetCatalogRootAction
|SetCurrentItemItemsAction