

import {Item} from "./App";


export type UpdStore ={
    store_before:Item
    store_upd:Item
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
