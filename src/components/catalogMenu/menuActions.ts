import {AddToItem, CatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";
import {Masks} from "../../masks/Masks";
import {Tools} from "../../tools/Tools";


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
    if ((catalogItem.mask & Masks.CATALOG_MASK)==Masks.CATALOG_MASK && catalogItem.owner){
            let isIt:boolean=window.confirm(` Удалить каталог ${catalogItem.name.toUpperCase()} `)
            if (isIt){
                return Fetches.RemoveCatalogItem(catalogItem)
            }
    }
    if ((catalogItem.mask & Masks.CATALOG_ITEM_MASK)==Masks.CATALOG_ITEM_MASK){
        let isIt:boolean=window.confirm(` Удалить наименование: ${catalogItem.name.toUpperCase()} `)
    }




}

async function renameCatalog(catalogItem: CatalogItem): Promise<any|Error> {
    if (catalogItem.owner &&catalogItem.owner.ref) {
        let res = window.prompt(`Введите новое намиенование для ${catalogItem.owner?.name}`, catalogItem.name)
        if (res) {
             catalogItem.name=res
            Fetches.RenameCatalogItem({
                item: catalogItem,
                tableName: catalogItem.owner.ref
            }).then(r => console.log(r))
        }
    }

}

async function makeCatalog(toCatalogItem: CatalogItem): Promise<any|Error> {
    let res = window.prompt("Введите новое имя для " + toCatalogItem.name)
    if (res) {

        let newItem: CatalogItem = {
            id: -1,
            mask: Masks.CATALOG_MASK,
            items: null,
            name: res,
            ref: "",
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

async function makeCatalogItem(toCatalogItem: CatalogItem): Promise<any|Error> {

    let res = prompt("Введите имя")

    if (res && res.length>199){

        alert(` Слишком длинное имя ${res.length}`)
        return
    }

    if (res && res.length<200) {

        let newItem: CatalogItem = {
            id: -1,
            mask: Masks.CATALOG_ITEM_MASK,
            items: null,
            name: res,
            ref: "",
            owner:null
        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item: Tools.unRefCatalogItem(toCatalogItem)

        }

        return Fetches.MakeCatalogItem(adding)
    }
}


