import {CatalogNode} from "../../structs/catalog";

export interface ShowCatalogState {
    catalogNode:CatalogNode
}
export enum ShowCatalogActionTypes {
   SET_STATE="SET_STATE"
}

interface  ShowCatalogNodeAction {
    type:ShowCatalogActionTypes.SET_STATE
    payload:CatalogNode
}
export type ShowCatalogAction=ShowCatalogNodeAction