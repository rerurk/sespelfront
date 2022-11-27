import {CatalogNode} from "../../structs/catalog";
import {Dispatch} from "redux";
import {ShowCatalogAction, ShowCatalogActionTypes} from "../types/showCatalog";

export const SetShowCatalogState = (state: CatalogNode) => {
    return (dispatch: Dispatch<ShowCatalogAction>) => {
        dispatch({type: ShowCatalogActionTypes.SET_STATE, payload: state})
    }
}