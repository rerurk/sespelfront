import {ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/showCatalog";
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
    currentItem: forInitial


}


function setCurrentItem(item:CatalogItem): ShowCatalogState {
    console.log("setCurrentItem:",item)
   initialState.currentItem=item
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