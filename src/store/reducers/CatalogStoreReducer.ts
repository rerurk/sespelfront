import {Item} from "../../structs/catalog";
import {CatalogActions, CatalogActionTypes, CatalogState} from "../types/CatalogStoreTypes";

let forInitial: Item = {

    id: -1,
    name: "None",
    mask: -1,
    sys_id: "",
    items: null,
    owner: null
}

const initialState: CatalogState = {
    catalogRoot: null,
    currentCatalog: forInitial,
    currCatalogItem:null



}

export function GetCurrentState():CatalogState {
return initialState
}

function setCurrentCatalogItem(catalogItem:Item): CatalogState {

    initialState.currCatalogItem = catalogItem
    return initialState
}

function setCurrentCatalog(catalogItem:Item): CatalogState {
    console.log("Store State catalogItem:",catalogItem)

    initialState.currentCatalog = catalogItem
    return initialState
}

function setCatalogRoot(root: Item): CatalogState {
    console.log("function setCatalogRoot:",root)
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