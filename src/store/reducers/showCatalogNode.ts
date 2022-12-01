import {CatalogAndItems, ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/showCatalog";
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
    currentItem: forInitial,
    items: []


}

export function GetCurrentState():ShowCatalogState {
return initialState
}

function setCurrentItem(catalogAndItems: CatalogAndItems): ShowCatalogState {
    console.log(catalogAndItems)

  /*  if (catalogAndItems.items) {
        catalogAndItems.item.items = catalogAndItems.items

    }*/
    initialState.items = catalogAndItems.items
    initialState.currentItem = catalogAndItems.item
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