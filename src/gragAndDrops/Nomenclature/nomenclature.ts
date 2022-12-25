import {Fetches} from "../../fetches/Fetches";

import {ExtendedItem, TransferItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";

type drags = {
    dragItem: ExtendedItem | null
    dragItemEnter: ExtendedItem | null
    ownerStoreItem: ExtendedItem | null
}
let dragNomenclatureItems: drags = {
    dragItem: null,
    dragItemEnter: null,
    ownerStoreItem: null
}

export function OnItemDragStart(item: ExtendedItem) {

    if (item !== dragNomenclatureItems.dragItem) {
        dragNomenclatureItems.dragItem = item
        dragNomenclatureItems.ownerStoreItem = item.ownerItem

    }

}

export function OnItemDragEnter(item: ExtendedItem) {
    dragNomenclatureItems.dragItemEnter = item
}

export async function ConfirmReplaceItem(): Promise<any | Error> {

    let transferItem: TransferItem | null = GetItems()

    if (transferItem
        && transferItem.from.uuid !== transferItem.to.uuid
        && transferItem.to.uuid !== transferItem.item.uuid
        && transferItem.item
        && transferItem.from
        && transferItem.to
    ) {
        let isIt = window.confirm(`Перенести  ${transferItem?.item.name.toUpperCase()} в каталог ${transferItem?.to.name.toLocaleUpperCase()} ?`)

        if (isIt) {
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
    if (dragNomenclatureItems.ownerStoreItem && dragNomenclatureItems.ownerStoreItem.callReBoot) {
        dragNomenclatureItems.ownerStoreItem.callReBoot()

    }
    if (dragNomenclatureItems.dragItemEnter && dragNomenclatureItems.dragItemEnter.callReBoot) {
        dragNomenclatureItems.dragItemEnter.callReBoot()

    }

    dragNomenclatureItems.dragItem = null
    dragNomenclatureItems.dragItemEnter = null
    dragNomenclatureItems.ownerStoreItem = null
}

function GetItems(): TransferItem | null {
    if (dragNomenclatureItems.dragItem && dragNomenclatureItems.dragItemEnter && dragNomenclatureItems.ownerStoreItem && testToContains()) {

        let transferItem: TransferItem = {
            from: Tools.unRefCatalogItem(dragNomenclatureItems.ownerStoreItem),
            to: Tools.unRefCatalogItem(dragNomenclatureItems.dragItemEnter),
            item: Tools.unRefCatalogItem(dragNomenclatureItems.dragItem)

        }


        return transferItem
    }
    return null
}

function testToContains(): boolean {
    /*TODO тоже свмое сделть на в беке*/
    let test: boolean;
    if (dragNomenclatureItems.dragItemEnter && dragNomenclatureItems.dragItem) {
        let owner: ExtendedItem | null = dragNomenclatureItems.dragItemEnter.ownerItem

        // для гарантии выхода из цикла
        let count: number = 0
        test = true
        while (owner != null && count < 50) {
            count++
            if (dragNomenclatureItems.dragItem.name === owner?.name) {
                test = false
                alert(`Каталог ${dragNomenclatureItems.dragItem.name} содержить в себе ${dragNomenclatureItems.dragItemEnter.name}`)
            }
            owner = owner.ownerItem

        }
    } else {
        test = false
    }

    return test
}

