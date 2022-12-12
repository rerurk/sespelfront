import {Item} from "../../structs/catalog";
import {StoreAssets} from "../../structs/StoreAssets";

export interface AppState {
    currentCatalog: Item// текущий выбранный каталог для отобрадения
    catalogRoot: Item | null//корень каталога, его получаемс сервера
    currCatalogItem: Item | null//
    currentStore: StoreAssets | null// текущий отоброаемый склад
}


export enum AppActionTypes {
    SET_CURRENT_CATALOG = "SET_CURRENT_CATALOG",
    SET_CATALOG_ROOT = 'SET_CATALOG_ROOT',
    SET_CURRENT_CATALOG_ITEM = "SET_CURRENT_CATALOG_ITEM",
    SET_CURRENT_ASSET_STORE = "SET_CURRENT_ASSET_STORE"

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

interface SetAssetsStorage {
    type: AppActionTypes.SET_CURRENT_ASSET_STORE
    payload: StoreAssets
}

export type CatalogActions = SetCurrentCatalogAction
    | SetCatalogRootAction
    | SetCurrentCatalogItemAction
    | SetAssetsStorage