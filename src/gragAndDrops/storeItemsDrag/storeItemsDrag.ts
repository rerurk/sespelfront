
import {Fetches} from "../../fetches/Fetches";
import {StoreItem} from "../../structs/StoreAssets";
import {TransferItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";

type drags={
    dragItem:StoreItem | null
    dragItemEnter: StoreItem | null
    ownerStoreItem: StoreItem | null
}
let dragStoreItems:drags={
    dragItem:null,
    dragItemEnter:null,
    ownerStoreItem:null
}
export function OnStoreItemDragStart(item: StoreItem) {

    if (item !==dragStoreItems.dragItem) {
        dragStoreItems.dragItem = item
        dragStoreItems.ownerStoreItem = item.ownerItem

    }

}

export function OnStoreItemDragEnter(item: StoreItem) {
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
    if (dragStoreItems.ownerStoreItem&&dragStoreItems.ownerStoreItem.callReBoot){
        dragStoreItems.ownerStoreItem.callReBoot()

    }
    if (dragStoreItems.dragItemEnter&&dragStoreItems.dragItemEnter.callReBoot){
        dragStoreItems.dragItemEnter.callReBoot()

    }

}

function GetItems(): TransferItem | null {
    if (dragStoreItems.dragItem && dragStoreItems.dragItemEnter && dragStoreItems.ownerStoreItem && testToContains()) {

        let transferItem: TransferItem = {
            from: Tools.unRefCatalogItem(dragStoreItems.ownerStoreItem),
            to: Tools.unRefCatalogItem(dragStoreItems.dragItemEnter),
            item: Tools.unRefCatalogItem(dragStoreItems.dragItem)

        }

        dragStoreItems.dragItem = null
        dragStoreItems.dragItemEnter = null
        dragStoreItems.ownerStoreItem = null

        return transferItem
    }
    return null
}

function testToContains(): boolean {
    /*TODO тоже свмое сделть на в беке*/
    let test: boolean;
    if (dragStoreItems.dragItemEnter && dragStoreItems.dragItem) {
        let owner: StoreItem| null = dragStoreItems.dragItemEnter.ownerItem

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

