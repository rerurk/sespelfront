export type CatalogItem = {

    id: number
    name: string
    is_table: string
    ref: string
    image:string
    description:string
    items :CatalogItem[]|null
}