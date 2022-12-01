import {CatalogItem, TransferCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";
import {Masks} from "../../masks/Masks";
import {Tools} from "../../tools/Tools";

let dragItem: CatalogItem | null = null
let dragItemEnter: CatalogItem | null = null
let parentCatalogItem: CatalogItem | null = null

export function onItemDrag(item: CatalogItem) {
    if (item != dragItem) {
        dragItem = item
        parentCatalogItem = item.parent
        console.log("dragItem:", item)
        console.log("parentItem:", parentCatalogItem)
    }

}

export function OnItemDragEnter(item: CatalogItem) {
    if ((item.mask&Masks.CATALOG_MASK)!=Masks.CATALOG_MASK) return
    if (dragItemEnter === item) return;
    dragItemEnter = item
    console.log("dragItemEnter:", dragItemEnter)
}

export async function ConfirmReplace ():Promise<any|Error|TransferCatalogItem> {
    let transferCatalogItem: TransferCatalogItem | null = GetItems()
    console.log(transferCatalogItem)


    if (transferCatalogItem && transferCatalogItem.from.ref !=transferCatalogItem.to.ref && transferCatalogItem.to.ref!=transferCatalogItem.item.ref) {


        let isIt = window.confirm(`Перенести каталог ${transferCatalogItem?.item.name.toUpperCase()} в ${transferCatalogItem?.to.name.toLocaleUpperCase()} ?`)

        if (isIt && transferCatalogItem && transferCatalogItem.item && transferCatalogItem.from && transferCatalogItem.to) {
            return Fetches.TransferCatalogItem(transferCatalogItem).then(r=>transferCatalogItem)

        } else {
            return Error("упс.. не перенслос....")
        }
    }
}

function GetItems(): TransferCatalogItem | null {

    if (dragItem && dragItemEnter &&parentCatalogItem) {

        let transferItem: TransferCatalogItem = {
            from: parentCatalogItem,
            to: dragItemEnter,
            item: dragItem

        }
        console.log(transferItem)
        dragItem = null
        dragItemEnter = null
        parentCatalogItem = null
        return transferItem
    }
    return null
}

