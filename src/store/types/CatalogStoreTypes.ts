import {Item} from "../../structs/catalog";

export interface AppState {
    currentCatalog: Item// текущий выбранный каталог для отобрадения
    catalogRoot: Item | null//корень каталога, его получаемс сервера
    currCatalogItem: Item | null//
    mainAssetStore: Item | null// осовной склад
}


export enum AppActionTypes {
    SET_CURRENT_CATALOG = "SET_CURRENT_CATALOG",
    SET_CATALOG_ROOT = 'SET_CATALOG_ROOT',
    SET_CURRENT_CATALOG_ITEM = "SET_CURRENT_CATALOG_ITEM",
    SET_MAIN_ASSET_STORE = "SET_MAIN_ASSET_STORE"

}

interface SetCurrentCatalogItemAction {
    type: AppActionTypes.SET_CURRENT_CATALOG_ITEM
    payload: Item
}

interface SetCurrentCatalogAction {
    type: AppActionTypes.SET_CURRENT_CATALOG
    payload: Item
}

interface SetCatalogRootAction {
    type: AppActionTypes.SET_CATALOG_ROOT
    payload: Item
}

interface SetMainAssetStorage {
    type: AppActionTypes.SET_MAIN_ASSET_STORE
    payload: Item
}

export type CatalogActions = SetCurrentCatalogAction
    | SetCatalogRootAction
    | SetCurrentCatalogItemAction
    | SetMainAssetStorage