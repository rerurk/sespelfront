/*
export interface Item {
    id: number
    name: string
    mask:number
    uuid: string
    owner:Item|null
    items: Item[] | null
    callReBoot?:Function
    callShow?:Function
    isOpen?:boolean

}
*/

/*export type Item={
    id: number
    name: string
    mask:number
    uuid: string
    owner_uuid:string|null
}*/

import {Item} from "./App";

export interface NomenclatureItem extends Item{
    id: number
    name: string
    type:number
    uuid: string
    owner_uuid:string|null

    ownerItem:NomenclatureItem|null
    items: NomenclatureItem[]|null
    callReBoot?:Function
    callShow?:Function
    isOpen?:boolean
}




export type  TransferNomenclatureItem = {
    from: NomenclatureItem
    to: NomenclatureItem
    item: NomenclatureItem
}

export type RemoveItem ={
    remove_from_item:Item,
    removed_item:Item
}

