import {Item} from "../../structs/catalog";
import {CatalogActions, AppActionTypes, AppState} from "../types/CatalogStoreTypes";

let forInitial: Item = {

    id: -1,
    name: "None",
    mask: -1,
    sys_id: "",
    items: null,
    owner: null
}

const initialState: AppState = {
    catalogRoot: null,
    currentCatalog: forInitial,
    currCatalogItem:null,
    mainAssetStore:null



}

export function GetCurrentState():AppState {
return initialState
}

function setCurrentCatalogItem(catalogItem:Item): AppState {

    initialState.currCatalogItem = catalogItem
    return initialState
}

function setCurrentCatalog(catalogItem:Item): AppState {
    console.log("Store State catalogItem:",catalogItem)

    initialState.currentCatalog = catalogItem
    return initialState
}

function setCatalogRoot(root: Item): AppState {

    initialState.catalogRoot = root
    return initialState
}

    function setMainAssetStore(mainStore:Item) {

     initialState.mainAssetStore=mainStore
    return initialState
}

export const showCatalogNodeReducer = (state = initialState, action: CatalogActions): AppState => {

    switch (action.type) {
        case AppActionTypes.SET_CURRENT_CATALOG:
            return {...setCurrentCatalog(action.payload)}
        case AppActionTypes.SET_CATALOG_ROOT:
            return {...setCatalogRoot(action.payload)}
        case AppActionTypes.SET_CURRENT_CATALOG_ITEM:
            return {...setCurrentCatalogItem(action.payload)}
        case AppActionTypes.SET_MAIN_ASSET_STORE:
            return {...setMainAssetStore(action.payload)}

        default:
            return state
    }
}