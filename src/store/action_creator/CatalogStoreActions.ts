import {CatalogItem} from "../../structs/catalog";
import {Dispatch} from "redux";
import {CatalogAndItems, ShowCatalogAction, ShowCatalogActionTypes} from "../types/CatalogStoreTypes";

export const SetCurrentCatalogState = (catalogItem: CatalogItem) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_STATE, payload: catalogItem})
    }
}

export const SetCatalogRootState = (root: CatalogItem) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_CATALOG_ROOT, payload: root})
    }
}