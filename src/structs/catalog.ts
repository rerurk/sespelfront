export type CatalogItem = {
    id: number
    name: string
    mask:number
    ref: string
    parent:CatalogItem|null
    items: CatalogItem[] | null
}

/*
* 	ID      int64         `json:"id"`
	Name    string        `json:"name"`
	IsTable bool          `json:"is_table"`
	Ref     string        `json:"ref"`
	Items   []CatalogItem `json:"items"`
* */

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
/*export type CatalogNode={
    parent:CatalogNode|null
    self:CatalogItem
}*/

/*
export type CatalogNode={
    parent:CatalogItem|null
    self:CatalogItem
}
*/
