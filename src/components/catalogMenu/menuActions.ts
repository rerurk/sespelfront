import {AddToItem, CatalogItem, CatalogNode} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


export enum Menu {
    MAKE_CATALOG = "Создать дир",
    MAKE_CATALOG_ITEM = "СОЗДАТЬ наимен",
    REMOVE = "УДАЛИТЬ",
    DO_1 = "DO_1"
}

interface MakeCatalogAction {
    type: Menu.MAKE_CATALOG
    payload: CatalogNode | null
}

interface MakeCatalogItemAction {
    type: Menu.MAKE_CATALOG_ITEM
    payload: CatalogNode | null
}

interface RemoveCatalogItemAction {
    type: Menu.REMOVE
    payload: CatalogNode | null
}

export type MenuAction = MakeCatalogAction | MakeCatalogItemAction | RemoveCatalogItemAction

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
        default:
            break
    }


}

function makeItem(catalogNode: CatalogNode) {
       let res=prompt("Введите имя")
    if(res){
        console.log(res)
        let newItem:CatalogItem={
            id: -1,
            is_table: false,
            items: [],
            name: res,
            ref: ""
        }
        let adding:AddToItem={
            adding_item:newItem,
            to_add_item:catalogNode.self

        }
        Fetches.MakeCatalogItem(adding).then(r=>console.log(r))
    }
}

function makeCatalogItem(catalogNode: CatalogNode) {
    let res=prompt("Введите имя")
    if(res){
        console.log(res)
        let newItem:CatalogItem={
            id: -1,
            is_table: true,
            items: [],
            name: res,
            ref: ""
        }
        let adding:AddToItem={
            adding_item:newItem,
            to_add_item:catalogNode.self

        }
        Fetches.MakeCatalogItem(adding).then(r=>console.log(r))
    }
}
