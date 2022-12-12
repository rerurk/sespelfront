import {Item} from "../../structs/catalog";
import {Dispatch} from "redux";
import {CatalogActions, AppActionTypes} from "../types/CatalogStoreTypes";
import {StoreAssets} from "../../structs/StoreAssets";

export const SetCurrentCatalogItemState = (catalogItem: Item) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_CATALOG_ITEM, payload: catalogItem})
    }
}

export const SetCurrentCatalogState = (catalogItem: Item) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_CATALOG, payload: catalogItem})
    }
}

export const SetCatalogRootState = (root: Item) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CATALOG_ROOT, payload: root})
    }
}

export const SetAssetsStore = (store: StoreAssets) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_ASSET_STORE, payload: store})
    }
}