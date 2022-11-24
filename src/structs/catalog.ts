export type CatalogItem = {

    id: number
    name: string
    is_table: boolean
    ref: string
    image:string
    description:string
    items :CatalogItem[]|null
}

export type AddToItem ={
    adding_item:CatalogItem,
    to_add_item:CatalogItem
}