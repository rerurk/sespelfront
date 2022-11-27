import {CatalogItem, CatalogNode, ReplacesCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";

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
    if(dragItemEnter===item)return;
    dragItemEnter = item
    console.log("dragItemEnter:", dragItemEnter)
}

export const ConfirmReplace = () => {
    let replaceCatalogItem: ReplacesCatalogItem | null = GetItems()
    let isIt=window.confirm(`Перенести каталог ${replaceCatalogItem?.item.name.toUpperCase()} в ${replaceCatalogItem?.replace_to.name.toLocaleUpperCase()} ?`)

    if (isIt && replaceCatalogItem && replaceCatalogItem.item && replaceCatalogItem.replace_from && replaceCatalogItem.replace_to) {
        Fetches.ReplaceCatalogItem(replaceCatalogItem)
            .then(r => {
                window.location.reload()
            })
    } else {
        console.log("НичО нЭт")
    }

}

 function GetItems(): ReplacesCatalogItem | null {

    if (dragItem && dragItemEnter) {
        let replaceItem: ReplacesCatalogItem = {
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

