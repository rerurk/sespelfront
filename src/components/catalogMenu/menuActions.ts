import {AddToItem, CatalogItem, CatalogNode} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


export enum Menu {
    MAKE_CATALOG = "Создать дир",
    MAKE_CATALOG_ITEM = "СОЗДАТЬ наимен",
    RENAME_CATALOG = "Переименовать",
    REMOVE = "УДАЛИТЬ",

}

interface MakeCatalogAction {
    type: Menu.MAKE_CATALOG
    payload: CatalogNode | null
}

interface MakeCatalogItemAction {
    type: Menu.MAKE_CATALOG_ITEM
    payload: CatalogNode | null
}

interface RenameCatalogItemAction {
    type: Menu.RENAME_CATALOG
    payload: CatalogNode | null
}

interface RemoveCatalogItemAction {
    type: Menu.REMOVE
    payload: CatalogNode | null
}

export type MenuAction = MakeCatalogAction | MakeCatalogItemAction | RemoveCatalogItemAction | RenameCatalogItemAction

export function selectAction(menuAction: MenuAction) {

    switch (menuAction.type) {
        case Menu.MAKE_CATALOG_ITEM:
            console.log("Need append new name in item:", menuAction.payload)
            if (menuAction.payload) {
                makeItem(menuAction.payload)
            }
            break
        case Menu.MAKE_CATALOG:
            console.log("Need append new Catalog in item:", menuAction.payload)
            if (menuAction.payload) {
                makeCatalogItem(menuAction.payload)
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


function renameCatalog(catalogNode: CatalogNode): void {
     let res=window.prompt(`Введите новое намиенование для ${catalogNode.self.name}`,catalogNode.self.name)
    if (res){
        if(catalogNode.parent&&catalogNode.parent.items){
            catalogNode.parent.items=null
        }
        catalogNode.self.name=res
        catalogNode.self.items=null
        Fetches.RenameCatalogItem(catalogNode).then(r=>console.log(r))
    }
}

function makeItem(catalogNode: CatalogNode): void {
    let res = window.prompt("Введите новое имя для "+catalogNode.self.name)
    if (res) {

        let newItem: CatalogItem = {
            id: -1,
            is_table: false,
            items: [],
            name: res,
            ref: ""
        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item: catalogNode.self

        }
        Fetches.MakeCatalogItem(adding).then(r => console.log(r))
    }
}

function makeCatalogItem(catalogNode: CatalogNode): void {
    let res = prompt("Введите имя")
    if (res) {

        let newItem: CatalogItem = {
            id: -1,
            is_table: true,
            items: [],
            name: res,
            ref: ""
        }
        let adding: AddToItem = {
            adding_item: newItem,
            to_add_item: catalogNode.self

        }
        Fetches.MakeCatalogItem(adding).then(r => {

            console.log(r)
        })
    }
}
