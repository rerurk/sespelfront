import {AddToItem, Item, RenameCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";
import {Tools} from "../../tools/Tools";
import {AppItemMasks} from "../../App";




export enum Menu {
    MAKE_CATALOG = "Создать КАТАЛОГ",
    MAKE_CATALOG_ITEM = "Создать Наименование",
    RENAME_CATALOG = "Переименовать",
    REMOVE = "УДАЛИТЬ",

}


interface MakeCatalogAction {
    type: Menu.MAKE_CATALOG
    payload: Item | null
}

interface MakeCatalogItemAction {
    type: Menu.MAKE_CATALOG_ITEM
    payload: Item | null
}

interface RenameCatalogItemAction {
    type: Menu.RENAME_CATALOG
    payload:Item | null
}

interface RemoveCatalogItemAction {
    type: Menu.REMOVE
    payload: Item| null
}

export type MenuAction = MakeCatalogAction | MakeCatalogItemAction | RemoveCatalogItemAction | RenameCatalogItemAction

export async function selectAction(menuAction: MenuAction):Promise<any|Error> {

    switch (menuAction.type) {
        case Menu.MAKE_CATALOG_ITEM:
            console.log("Need append new name in item:", menuAction.payload)
            if (menuAction.payload) {
                return makeCatalogItem(menuAction.payload)
            }
            break
        case Menu.MAKE_CATALOG:
            console.log("Need append new Catalog in item:", menuAction.payload)
            if (menuAction.payload) {
                return makeCatalog(menuAction.payload)
            }
            break
        case Menu.REMOVE:
            console.log("Need remove Catalog from item:", menuAction.payload)
            if(menuAction.payload){
                return removeCatalog(menuAction.payload)
            }
            break
        case Menu.RENAME_CATALOG:
            if (menuAction.payload) {
               return  renameCatalog(menuAction.payload)
            }
            break
        default:
            break
    }


}

async function removeCatalog(catalogItem: Item): Promise<any|Error> {
    if ((catalogItem.mask & AppItemMasks.CATALOG_MASK)==AppItemMasks.CATALOG_MASK && catalogItem.owner){
            let isIt:boolean=window.confirm(` Удалить каталог ${catalogItem.name.toUpperCase()} `)
            if (isIt){
                return Fetches.RemoveCatalogItem(catalogItem)

            }
    }
    if ((catalogItem.mask & AppItemMasks.CATALOG_ITEM_MASK)==AppItemMasks.CATALOG_ITEM_MASK){
        let isIt:boolean=window.confirm(` Удалить наименование: ${catalogItem.name.toUpperCase()} `)
        if (isIt){
            return Fetches.RemoveCatalogItem(catalogItem)
        }
    }




}

async function renameCatalog(catalogItem: Item): Promise<any|Error> {


    if (catalogItem.owner &&catalogItem.owner.sys_id) {
        let res = window.prompt(`Введите новое намиенование для ${catalogItem.owner?.name}`, catalogItem.name)
        if (res) {
            let renameItem:Item=Tools.unRefCatalogItem(catalogItem)
            renameItem.name=res
             let rename:RenameCatalogItem= {
                 item:Tools.unRefCatalogItem(catalogItem),
                 renamed_item:renameItem
             }
             return Fetches.RenameCatalogItem(rename)
        }
    }

}

async function makeCatalog(toCatalogItem: Item): Promise<any|Error> {
    let res = window.prompt("Введите новое имя для " + toCatalogItem.name)
    if (res) {

        let newItem: Item = {
            id: -1,
            mask: AppItemMasks.CATALOG_MASK,
            items: null,
            name: res,
            sys_id: "",
            owner:null

        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item:Tools.unRefCatalogItem(toCatalogItem)

        }
        return Fetches.MakeCatalogItem(adding)
    }else {
        return new Promise<Error>((res, rej) => {
            return rej
        })
    }
}

async function makeCatalogItem(toCatalogItem: Item): Promise<any|Error> {

    let res = prompt("Введите имя")

    if (res && res.length>199){

        alert(` Слишком длинное имя ${res.length}`)
        return
    }

    if (res && res.length<200) {

        let newItem: Item = {
            id: -1,
            mask:AppItemMasks.CATALOG_ITEM_MASK,
            items: null,
            name: res,
            sys_id: "",
            owner:null
        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item: Tools.unRefCatalogItem(toCatalogItem)

        }

        return Fetches.MakeCatalogItem(adding)
    }
}


