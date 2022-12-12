import {Item} from "./catalog";
import {TAddress} from "../components/UI/address/Address";

export type StoreAssets={
    item:Item,
    address:TAddress
}

export type UpdatingStore ={
    store_before:StoreAssets
    store_upd:StoreAssets
}