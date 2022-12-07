export interface CatalogItem {
    id: number
    name: string
    mask:number
    sys_id: string
    owner:CatalogItem|null
    items: CatalogItem[] | null
    callReBoot?:Function
    callShow?:Function
    isOpen?:boolean

}



export type AddToItem = {
    adding_item: CatalogItem,
    to_add_item: CatalogItem
}

export type  TransferCatalogItem = {
    from: CatalogItem
    to: CatalogItem
    item: CatalogItem
}
export type RemoveItem ={
    remove_from_item:CatalogItem,
    removed_item:CatalogItem
}

export type RenameCatalogItem={
    item:CatalogItem,
    renamed_item:CatalogItem,
}
