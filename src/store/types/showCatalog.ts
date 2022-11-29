import {CatalogItem, CatalogNode} from "../../structs/catalog";

export interface ShowCatalogState {
    catalogNode:CatalogNode
    catalogRoot:CatalogItem|null
}
export enum ShowCatalogActionTypes {
   SET_STATE="SET_STATE",
    SET_CATALOG_ROOT='SET_CATALOG_ROOT'
}

interface  ShowCatalogNodeAction {
    type:ShowCatalogActionTypes.SET_STATE
    payload:CatalogNode
}

interface  SetCatalogRootAction {
    type:ShowCatalogActionTypes.SET_CATALOG_ROOT
    payload:CatalogItem
}
export type ShowCatalogAction=ShowCatalogNodeAction
|SetCatalogRootAction