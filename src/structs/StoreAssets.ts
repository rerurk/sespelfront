
import {TAddress} from "../components/UI/address/Address";
import {Item} from "./App";

export type StoreAssets={
    item:Item,
    address:TAddress
}

export type UpdStore ={
    store_before:StoreAssets
    store_upd:StoreAssets
}