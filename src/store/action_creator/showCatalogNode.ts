import {CatalogItem} from "../../structs/catalog";
import {Dispatch} from "redux";
import {ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/showCatalog";

export const SetCurrentCatalogItems= (state: CatalogItem[]) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_CATALOG_ITEMS, payload: state})
    }
}

export const SetCurrentCatalogState = (state: CatalogItem) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_STATE, payload: state})
    }
}

export const SetCatalogRootState = (root: CatalogItem) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_CATALOG_ROOT, payload: root})
    }
}