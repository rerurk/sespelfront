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

    }

}

export function OnItemDragEnter(item: CatalogItem) {
    if ((item.mask & Masks.CATALOG_MASK) != Masks.CATALOG_MASK) return
    if (dragItemEnter === item) return;
    dragItemEnter = item

}

export async function ConfirmReplace(): Promise<any | Error | TransferCatalogItem> {
    let transferCatalogItem: TransferCatalogItem | null = GetItems()

    if (transferCatalogItem && transferCatalogItem.from.ref != transferCatalogItem.to.ref && transferCatalogItem.to.ref != transferCatalogItem.item.ref) {


        let isIt = window.confirm(`Перенести каталог ${transferCatalogItem?.item.name.toUpperCase()} в ${transferCatalogItem?.to.name.toLocaleUpperCase()} ?`)

        if (isIt && transferCatalogItem && transferCatalogItem.item && transferCatalogItem.from && transferCatalogItem.to) {
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
    if (dragItem && dragItemEnter && parentCatalogItem && testToContains()) {

        let transferItem: TransferCatalogItem = {
            from: parentCatalogItem,
            to: dragItemEnter,
            item: dragItem

        }

        dragItem = null
        dragItemEnter = null
        parentCatalogItem = null
        return transferItem
    }
    return null
}

function testToContains():boolean {
    /*TODO тоже свмое сделть на в беке*/
    let test:boolean;
    if (dragItemEnter&&dragItem){
        let parent:CatalogItem|null=dragItemEnter.parent

        // для гарантии выхода из цикла
        let count:number=0
        test=true
        while (parent!=null&&count<50){
            console.log("testToContains():",parent)
            count++
            if(dragItem.name==parent?.name){
                test=false
                alert(`Каталог ${dragItem.name} содержить в себе ${dragItemEnter.name}`)
            }
            parent=parent.parent

        }
    }else {
        test=false
    }

   return test
}

