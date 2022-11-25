import {AddToItem, CatalogItem, ReplaceCatalogItem} from "../../structs/catalog";

let dragItem: CatalogItem | null=null
let dragItemEnter: CatalogItem | null=null
let parentCatalogItem:CatalogItem|null=null

export function onItemDrag(item: CatalogItem,parenItem:CatalogItem|null) {
    if (item != dragItem) {
        dragItem = item
        parentCatalogItem=parenItem
        console.log("dragItem:", item)
        console.log("parentItem:",parentCatalogItem)
    }

}

export function OnItemDragEnter(item: CatalogItem) {
    if (!item.is_table) return
    dragItemEnter = item
    console.log("dragItemEnter:", dragItemEnter)
}

export function GetItems(): ReplaceCatalogItem | null {

    if (dragItem && dragItemEnter) {
        let replaceItem: ReplaceCatalogItem = {
            replace_from: JSON.parse(JSON.stringify(parentCatalogItem)),
            replace_to: JSON.parse(JSON.stringify(dragItemEnter)),
            item:JSON.parse(JSON.stringify(dragItem))
        }
        dragItem = null
        dragItemEnter = null
        parentCatalogItem=null
        return replaceItem
    }
    return null
}

