import {CatalogItem} from "../../structs/catalog";
import {Dispatch} from "redux";
import {CatalogAndItems, ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/showCatalog";

<<<<<<< HEAD
export const SetCurrentCatalogItems= (state: CatalogItem[]) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_CATALOG_ITEMS, payload: state})
    }
}

export const SetCurrentCatalogState = (state: CatalogItem) => {
=======
export const SetCurrentCatalogState = (catalogAndItems: CatalogAndItems) => {
>>>>>>> bd3c30d07e288e8e65f1ea9dbf04a06d26762aa9
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_STATE, payload: catalogAndItems})
    }
}

export const SetCatalogRootState = (root: CatalogItem) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_CATALOG_ROOT, payload: root})
    }
}