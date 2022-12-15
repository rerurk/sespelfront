import {AddToItem, CatalogItem, Item, RenameCatalogItem} from "../../structs/catalog";
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
    payload: CatalogItem | null
}

interface MakeCatalogItemAction {
    type: Menu.MAKE_CATALOG_ITEM
    payload: CatalogItem | null
}

interface RenameCatalogItemAction {
    type: Menu.RENAME_CATALOG
    payload:CatalogItem | null
}

interface RemoveCatalogItemAction {
    type: Menu.REMOVE
    payload: CatalogItem| null
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

async function removeCatalog(catalogItem: CatalogItem): Promise<any|Error> {
    if ((catalogItem.mask & AppItemMasks.CATALOG_MASK)==AppItemMasks.CATALOG_MASK && catalogItem.ownerItem){
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

async function renameCatalog(catalogItem: CatalogItem): Promise<any|Error> {


    if (catalogItem.ownerItem &&catalogItem.ownerItem.uuid) {
        let res = window.prompt(`Введите новое намиенование для ${catalogItem.ownerItem?.name}`, catalogItem.name)
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

async function makeCatalog(toCatalogItem: CatalogItem): Promise<any|Error> {
    let res = window.prompt("Введите новое имя для " + toCatalogItem.name)
    if (res) {

        let newItem: Item = {
            id: -1,
            mask: AppItemMasks.CATALOG_MASK,
            name: res,
            uuid: "",
            owner_uuid:""

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

async function makeCatalogItem(toCatalogItem: CatalogItem): Promise<any|Error> {

    let res = prompt("Введите имя")

    if (res && res.length>199){

        alert(` Слишком длинное имя ${res.length}`)
        return
    }

    if (res && res.length<200) {

        let newItem: Item = {
            id: -1,
            mask:AppItemMasks.CATALOG_ITEM_MASK,

            name: res,
            uuid: "",
            owner_uuid:null
        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item: Tools.unRefCatalogItem(toCatalogItem)

        }

        return Fetches.MakeCatalogItem(adding)
    }
}


