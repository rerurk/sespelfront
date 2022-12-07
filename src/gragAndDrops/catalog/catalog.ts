import {CatalogItem, TransferCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";
import {Masks} from "../../masks/Masks";

import {ShowAppConfirm} from "../../components/appConfirm/AppConfirm";

let dragItem: CatalogItem | null = null
let dragItemEnter: CatalogItem | null = null
let ownerCatalogItem: CatalogItem | null = null

export function onItemDrag(item: CatalogItem) {
    if (item != dragItem) {
        dragItem = item
        ownerCatalogItem = item.owner

    }

}

export function OnItemDragEnter(item: CatalogItem) {
    if ((item.mask & Masks.CATALOG_MASK) != Masks.CATALOG_MASK) return
    if (dragItemEnter === item) return;
    dragItemEnter = item

}

export async function ConfirmReplace(): Promise<any | Error | TransferCatalogItem> {
    let transferCatalogItem: TransferCatalogItem | null = GetItems()




    if (transferCatalogItem
        && transferCatalogItem.from.sys_id != transferCatalogItem.to.sys_id
        && transferCatalogItem.to.sys_id != transferCatalogItem.item.sys_id
        && transferCatalogItem.item
        && transferCatalogItem.from
        && transferCatalogItem.to
    ) {
        let isIt = window.confirm(`Перенести  ${transferCatalogItem?.item.name.toUpperCase()} в каталог ${transferCatalogItem?.to.name.toLocaleUpperCase()} ?`)

        if (isIt ) {
            return Fetches.TransferCatalogItem(transferCatalogItem).then(r => {
                    if (!(r instanceof Error)) {
                        if (transferCatalogItem) {
                            rebootItems(transferCatalogItem)
                        }

                    }
                }
            )

        } else {
            return Error("упс.. не перенслос....")
        }
    }
}

function rebootItems(transferCatalogItem: TransferCatalogItem) {
    if (transferCatalogItem) {

        if (transferCatalogItem.from.callReBoot) {
            transferCatalogItem.from.callReBoot();
        }
        if (transferCatalogItem.to.callReBoot) {
            transferCatalogItem.to.callReBoot();
        }
    }
}

function GetItems(): TransferCatalogItem | null {
    if (dragItem && dragItemEnter && ownerCatalogItem && testToContains()) {

        let transferItem: TransferCatalogItem = {
            from: ownerCatalogItem,
            to: dragItemEnter,
            item: dragItem

        }

        dragItem = null
        dragItemEnter = null
        ownerCatalogItem = null
        console.log(dragItem, transferItem.item)
        return transferItem
    }
    return null
}

function testToContains(): boolean {
    /*TODO тоже свмое сделть на в беке*/
    let test: boolean;
    if (dragItemEnter && dragItem) {
        let owner: CatalogItem | null = dragItemEnter.owner

        // для гарантии выхода из цикла
        let count: number = 0
        test = true
        while (owner != null && count < 50) {

            count++
            if (dragItem.name == owner?.name) {
                test = false
                alert(`Каталог ${dragItem.name} содержить в себе ${dragItemEnter.name}`)
            }
            owner = owner.owner

        }
    } else {
        test = false
    }

    return test
}

