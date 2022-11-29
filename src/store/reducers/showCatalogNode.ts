import {ShowCatalogAction, ShowCatalogActionTypes, ShowCatalogState} from "../types/showCatalog";
import {CatalogItem, CatalogNode} from "../../structs/catalog";
import {Masks} from "../../masks/Masks";

let forInitial: CatalogNode = {
    parent: null,
    self: {
        id: -1,
        name: "None",
        mask: Masks.CATALOG_MASK,
        ref: "",
        items: null}
}

const initialState: ShowCatalogState = {
    catalogNode: forInitial,
    catalogRoot:null
}


function setStateCatalogNode(catalogNode: CatalogNode): ShowCatalogState {
    initialState.catalogNode = catalogNode
    return initialState
}

function setCatalogRoot(root: CatalogItem):ShowCatalogState {
    initialState.catalogRoot=root
return initialState
}

export const showCatalogNodeReducer = (state = initialState, action: ShowCatalogAction): ShowCatalogState => {

    switch (action.type) {
        case ShowCatalogActionTypes.SET_STATE:
            return {...setStateCatalogNode(action.payload)}
        case ShowCatalogActionTypes.SET_CATALOG_ROOT:
            return {...setCatalogRoot(action.payload)}
        default:
            return state
    }
}