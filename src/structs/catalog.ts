export type CatalogItem = {

    id: number
    name: string
    is_table: boolean
    ref: string
    image: string
    description: string
    items: CatalogItem[] | null
}

export type AddToItem = {
    adding_item: CatalogItem,
    to_add_item: CatalogItem
}

export type  ReplaceCatalogItem = {
    replace_from: CatalogItem
    replace_to: CatalogItem
    item: CatalogItem
}
