import {ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/CatalogStoreTypes";
import {CatalogItem} from "../../structs/catalog";
import {Masks} from "../../masks/Masks";

let forInitial: CatalogItem = {

    id: -1,
    name: "None",
    mask: Masks.CATALOG_MASK,
    ref: "",
    items: null,
    parent: null
}

const initialState: ShowCatalogState = {
    catalogRoot: null,
    currentShowCatalog: forInitial,



}

export function GetCurrentState():ShowCatalogState {
return initialState
}

function setCurrentItem(catalogItem:CatalogItem): ShowCatalogState {
    console.log("Store State catalogItem:",catalogItem)

    initialState.currentShowCatalog = catalogItem
    return initialState
}

function setCatalogRoot(root: CatalogItem): ShowCatalogState {
    initialState.catalogRoot = root
    return initialState
}

export const showCatalogNodeReducer = (state = initialState, action: ShowCatalogAction): ShowCatalogState => {

    switch (action.type) {
        case ShowCatalogActionTypes.SET_STATE:
            return {...setCurrentItem(action.payload)}
        case ShowCatalogActionTypes.SET_CATALOG_ROOT:
            return {...setCatalogRoot(action.payload)}
        default:
            return state
    }
}