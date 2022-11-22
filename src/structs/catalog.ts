export type CatalogNode={
    his_id: string,
    parent_id: string,
    name:string
    nodes:CatalogNode[]|null
}