import {Item} from "../../structs/catalog";

export interface CatalogState {
    currentCatalog: Item
    catalogRoot: Item | null
    currCatalogItem: Item | null


}


export enum CatalogActionTypes {
    SET_CURRENT_CATALOG = "SET_CURRENT_CATALOG",
    SET_CATALOG_ROOT = 'SET_CATALOG_ROOT',
    SET_CURRENT_CATALOG_ITEM = " SET_CURRENT_CATALOG_ITEM",

}

interface SetCurrentCatalogItemAction {
    type: CatalogActionTypes.SET_CURRENT_CATALOG_ITEM
    payload: Item
}

interface SetCurrentCatalogAction {
    type: CatalogActionTypes.SET_CURRENT_CATALOG
    payload: Item
}

interface SetCatalogRootAction {
    type: CatalogActionTypes.SET_CATALOG_ROOT
    payload: Item
}

export type CatalogActions = SetCurrentCatalogAction
    | SetCatalogRootAction
    | SetCurrentCatalogItemAction