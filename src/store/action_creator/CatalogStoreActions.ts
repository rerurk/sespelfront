import {CatalogItem} from "../../structs/catalog";
import {Dispatch} from "redux";
import {CatalogActions, CatalogActionTypes} from "../types/CatalogStoreTypes";

export const SetCurrentCatalogItemState = (catalogItem: CatalogItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: CatalogActionTypes.SET_CURRENT_CATALOG_ITEM, payload: catalogItem})
    }
}

export const SetCurrentCatalogState = (catalogItem: CatalogItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: CatalogActionTypes.SET_CURRENT_CATALOG, payload: catalogItem})
    }
}

export const SetCatalogRootState = (root: CatalogItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: CatalogActionTypes.SET_CATALOG_ROOT, payload: root})
    }
}