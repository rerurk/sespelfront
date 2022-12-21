
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

export interface StoreItem extends Item{
    id: number
    name: string
    type:number
    uuid: string
    owner_uuid:string|null
    ownerItem:StoreItem|null
    items: StoreItem[]|null
    callReBoot?:Function
    callShow?:Function
    isOpen?:boolean
}