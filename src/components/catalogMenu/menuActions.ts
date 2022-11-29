import {AddToItem, CatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";
import {Masks} from "../../masks/Masks";


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
            break
        case Menu.RENAME_CATALOG:
            if (menuAction.payload) {
                renameCatalog(menuAction.payload)
            }
            break
        default:
            break
    }


}


function renameCatalog(catalogItem: CatalogItem): void {
    let res = window.prompt(`Введите новое намиенование для ${catalogItem.parent?.name}`, catalogItem.name)
    if (res) {
        if (catalogItem.parent && catalogItem.parent.items) {
            catalogItem.parent=null
        }
        catalogItem.name = res
        catalogItem.items = null
        Fetches.RenameCatalogItem(catalogItem).then(r => console.log(r))
    }
}

async function makeCatalog(toCatalogItem: CatalogItem): Promise<any|Error> {
    let res = window.prompt("Введите новое имя для " + toCatalogItem.name)
    if (res) {

        let newItem: CatalogItem = {
            id: -1,
            mask: Masks.CATALOG_MASK,
            items: [],
            name: res,
            ref: "",
            parent:toCatalogItem

        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item: toCatalogItem

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
            items: [],
            name: res,
            ref: "",
            parent:null
        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item: toCatalogItem

        }
        return Fetches.MakeCatalogItem(adding)
    }
}


