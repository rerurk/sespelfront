import {Item} from "./nomenclature";
import {TAddress} from "../components/UI/address/Address";

export type StoreAssets={
    item:Item,
    address:TAddress
}

export type UpdStore ={
    store_before:StoreAssets
    store_upd:StoreAssets
}