import {CatalogItem} from "../../structs/catalog";
import {Masks} from "../../masks/Masks";
import {CatalogActions, CatalogActionTypes, CatalogState} from "../types/CatalogStoreTypes";

let forInitial: CatalogItem = {

    id: -1,
    name: "None",
    mask: Masks.CATALOG_MASK,
    ref: "",
    items: null,
    parent: null
}

const initialState: CatalogState = {
    catalogRoot: null,
    currentCatalog: forInitial,
    currCatalogItem:null



}

export function GetCurrentState():CatalogState {
return initialState
}

function setCurrentCatalogItem(catalogItem:CatalogItem): CatalogState {
    console.log("Store State catalogItem:",catalogItem)

    initialState.currCatalogItem = catalogItem
    return initialState
}

function setCurrentCatalog(catalogItem:CatalogItem): CatalogState {
    console.log("Store State catalogItem:",catalogItem)

    initialState.currentCatalog = catalogItem
    return initialState
}

function setCatalogRoot(root: CatalogItem): CatalogState {
    initialState.catalogRoot = root
    return initialState
}

export const showCatalogNodeReducer = (state = initialState, action: CatalogActions): CatalogState => {

    switch (action.type) {
        case CatalogActionTypes.SET_CURRENT_CATALOG:
            return {...setCurrentCatalog(action.payload)}
        case CatalogActionTypes.SET_CATALOG_ROOT:
            return {...setCatalogRoot(action.payload)}
        case CatalogActionTypes.SET_CURRENT_CATALOG_ITEM:
            return {...setCurrentCatalogItem(action.payload)}

        default:
            return state
    }
}