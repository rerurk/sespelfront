import {CatalogItem} from "../../structs/catalog";
import {Dispatch} from "redux";
import {CatalogAndItems, ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/showCatalog";

export const SetCurrentCatalogState = (catalogAndItems: CatalogAndItems) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_STATE, payload: catalogAndItems})
    }
}

export const SetCatalogRootState = (root: CatalogItem) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_CATALOG_ROOT, payload: root})
    }
}