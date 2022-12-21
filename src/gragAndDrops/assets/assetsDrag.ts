import {Item} from "../../structs/App";


let dragItem:Item;
let onDragEnterItem:Item
let onDragLeaveItem:Item

export function AssetDrag(item:Item) {
    dragItem=item
console.log("dragItem:",item)
}
export function OnStoreDragEnter(item:Item) {
   onDragEnterItem=item
    console.log("onDragEnterItem",item)
}

export function OnStoreDragLive(item:Item) {
    onDragLeaveItem=item
    console.log("onDragLeaveItem",item)
}

export function OnAssetDragEnd() {
 console.log("moveTo:",onDragEnterItem.name)
    console.log("moveFrom:",onDragLeaveItem.name)
}