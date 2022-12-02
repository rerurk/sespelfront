import {CatalogItem} from "../../structs/catalog";

export interface CatalogState {
    currentCatalog: CatalogItem
    catalogRoot: CatalogItem | null
    currCatalogItem: CatalogItem | null


}


export enum CatalogActionTypes {
    SET_CURRENT_CATALOG = "SET_CURRENT_CATALOG",
    SET_CATALOG_ROOT = 'SET_CATALOG_ROOT',
    SET_CURRENT_CATALOG_ITEM = " SET_CURRENT_CATALOG_ITEM",

}

interface SetCurrentCatalogItemAction {
    type: CatalogActionTypes.SET_CURRENT_CATALOG_ITEM
    payload: CatalogItem
}

interface SetCurrentCatalogAction {
    type: CatalogActionTypes.SET_CURRENT_CATALOG
    payload: CatalogItem
}

interface SetCatalogRootAction {
    type: CatalogActionTypes.SET_CATALOG_ROOT
    payload: CatalogItem
}

export type CatalogActions = SetCurrentCatalogAction
    | SetCatalogRootAction
    | SetCurrentCatalogItemAction