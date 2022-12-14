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



export type AddToItem = {
    adding_item: Item,
    to_add_item: Item
}

export type  TransferCatalogItem = {
    from: Item
    to: Item
    item: Item
}

export type RemoveItem ={
    remove_from_item:Item,
    removed_item:Item
}

export type RenameCatalogItem={
    item:Item,
    renamed_item:Item,
}
