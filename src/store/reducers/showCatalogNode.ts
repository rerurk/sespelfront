import {ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/showCatalog";
import {CatalogNode} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


const initialState: ShowCatalogState = {
    catalogNode: null
}



function  setStateCatalogNode(catalogNode: CatalogNode): ShowCatalogState {
   initialState.catalogNode=catalogNode
    return initialState
}


export const showCatalogNodeReducer = (state = initialState, action: ShowCatalogAction): ShowCatalogState => {

    switch (action.type) {
        case ShowCatalogActionTypes.SET_STATE:
            return {...setStateCatalogNode(action.payload)}
        default:
            return state
    }
}