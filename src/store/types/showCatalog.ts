import {CatalogNode} from "../../structs/catalog";

export interface ShowCatalogState {
    catalogNode:CatalogNode|null
}
export enum ShowCatalogActionTypes {
   SET_STATE="SET_STATE"
}

interface  ShowCatalogNodeAction {
    type:ShowCatalogActionTypes.SET_STATE
    payload:CatalogNode
}
export type ShowCatalogAction=ShowCatalogNodeAction