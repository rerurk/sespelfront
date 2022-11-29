import {CatalogItem} from "../../structs/catalog";

export interface ShowCatalogState {
    currentItem:CatalogItem
    catalogRoot:CatalogItem|null
}
export enum ShowCatalogActionTypes {
    SET_STATE="SET_STATE",
    SET_CATALOG_ROOT='SET_CATALOG_ROOT'
}

interface  SetCurrentItemAction {
    type:ShowCatalogActionTypes.SET_STATE
    payload:CatalogItem
}

interface  SetCatalogRootAction {
    type:ShowCatalogActionTypes.SET_CATALOG_ROOT
    payload:CatalogItem
}
export type ShowCatalogAction=SetCurrentItemAction
|SetCatalogRootAction