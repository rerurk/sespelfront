import {CatalogItem, TransferCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";
import {Masks} from "../../masks/Masks";

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

export const ConfirmReplace = () => {
    let transferCatalogItem: TransferCatalogItem | null = GetItems()
    console.log(transferCatalogItem)
    if (transferCatalogItem && transferCatalogItem.from.ref !=transferCatalogItem.to.ref && transferCatalogItem.to.ref!=transferCatalogItem.item.ref) {


        let isIt = window.confirm(`Перенести каталог ${transferCatalogItem?.item.name.toUpperCase()} в ${transferCatalogItem?.to.name.toLocaleUpperCase()} ?`)

        if (isIt && transferCatalogItem && transferCatalogItem.item && transferCatalogItem.from && transferCatalogItem.to) {
            Fetches.TransferCatalogItem(transferCatalogItem)
                .then(r => {
                    window.location.reload()
                })
        } else {
            console.log("НичО нЭт")
        }
    }
}

function GetItems(): TransferCatalogItem | null {

    if (dragItem && dragItemEnter) {
        let transferItem: TransferCatalogItem = {
            from: JSON.parse(JSON.stringify(parentCatalogItem)),
            to: JSON.parse(JSON.stringify(dragItemEnter)),
            item: JSON.parse(JSON.stringify(dragItem))
        }
        dragItem = null
        dragItemEnter = null
        parentCatalogItem = null
        return transferItem
    }
    return null
}

