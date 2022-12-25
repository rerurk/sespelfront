export type GuiTextTitle = {
    text: string,
    title: string
}

export type Item = {
    id: number
    name: string
    type: number
    uuid: string
    owner_uuid: string | null
}

export interface ExtendedItem extends Item{
    id: number
    name: string
    type:number
    uuid: string
    owner_uuid:string|null

    ownerItem:ExtendedItem|null
    items: ExtendedItem[]|null
    callReBoot?:Function
    callShow?:Function
    isOpen?:boolean
}

export type  TransferItem = {
    from: Item
    to: Item
    item: Item
}

export type RenameItem={
    new_item:Item
    renamed_item:Item,

}

export type RemoveItem ={
    remove_from_item:Item,
    removed_item:Item
}

export type AddToItem = {
    adding_item: Item,
    to_add_item: Item
}
