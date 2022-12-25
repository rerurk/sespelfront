
import {Fetches} from "../../fetches/Fetches";

import {ExtendedItem, TransferItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";

type drags={
    dragItem:ExtendedItem | null
    dragItemEnter: ExtendedItem | null
    ownerStoreItem: ExtendedItem | null
}
let dragStoreItems:drags={
    dragItem:null,
    dragItemEnter:null,
    ownerStoreItem:null
}
export function OnStoreItemDragStart(item: ExtendedItem) {

    if (item !==dragStoreItems.dragItem) {
        dragStoreItems.dragItem = item
        dragStoreItems.ownerStoreItem = item.ownerItem

    }

}

export function OnStoreItemDragEnter(item: ExtendedItem) {
    dragStoreItems.dragItemEnter = item
}

export async function ConfirmReplaceStoreItem(): Promise<any | Error | TransferItem> {
    let transferItem: TransferItem | null = GetItems()

    if (transferItem
        && transferItem.from.uuid !== transferItem.to.uuid
        && transferItem.to.uuid !== transferItem.item.uuid
        && transferItem.item
        && transferItem.from
        && transferItem.to
    ) {
        let isIt = window.confirm(`Перенести  ${transferItem?.item.name.toUpperCase()} в каталог ${transferItem?.to.name.toLocaleUpperCase()} ?`)

        if (isIt ) {
            return Fetches.TransferItem(transferItem).then(r => {

                    if (!(r instanceof Error)) {
                        if (transferItem) {
                            rebootItems()
                        }

                    }

                }
            )

        } else {
            return Error("упс.. не перенслос....")
        }
    }
}

function rebootItems() {
    console.log("function rebootItems()")
    if (dragStoreItems.ownerStoreItem&&dragStoreItems.ownerStoreItem.callReBoot){
        dragStoreItems.ownerStoreItem.callReBoot()

    }
    if (dragStoreItems.dragItemEnter&&dragStoreItems.dragItemEnter.callReBoot){
        dragStoreItems.dragItemEnter.callReBoot()

    }
    dragStoreItems.dragItem = null
    dragStoreItems.dragItemEnter = null
    dragStoreItems.ownerStoreItem = null

}

function GetItems(): TransferItem | null {
    if (dragStoreItems.dragItem && dragStoreItems.dragItemEnter && dragStoreItems.ownerStoreItem && testToContains()) {

        let transferItem: TransferItem = {
            from: Tools.unRefCatalogItem(dragStoreItems.ownerStoreItem),
            to: Tools.unRefCatalogItem(dragStoreItems.dragItemEnter),
            item: Tools.unRefCatalogItem(dragStoreItems.dragItem)

        }



        return transferItem
    }
    return null
}

function testToContains(): boolean {
    /*TODO тоже свмое сделть на в беке*/
    let test: boolean;
    if (dragStoreItems.dragItemEnter && dragStoreItems.dragItem) {
        let owner: ExtendedItem| null = dragStoreItems.dragItemEnter.ownerItem

        // для гарантии выхода из цикла
        let count: number = 0
        test = true
        while (owner != null && count < 50) {
            count++
            if (dragStoreItems.dragItem.name === owner?.name) {
                test = false
                alert(`Каталог ${dragStoreItems.dragItem.name} содержить в себе ${dragStoreItems.dragItemEnter.name}`)
            }
            owner = owner.ownerItem

        }
    } else {
        test = false
    }

    return test
}

