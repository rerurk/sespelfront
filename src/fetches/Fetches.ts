import axios from "axios";

import {Requests} from "./Requests";
import {AddToItem, Item, RemoveItem, RenameCatalogItem, TransferCatalogItem} from "../structs/catalog";
import {Tools} from "../tools/Tools";
import {ItemMasks} from "../structs/Masks";


export type FetchesResult = [
    ItemMasks|Error,
    Item | Error

]

export class Fetches {

    public static async FetchAllData():Promise<FetchesResult>{
        return  Promise.all([this.GetItemMasks(),this.GetMainCatalogItem()])
    }

    public static async GetItemMasks():Promise<ItemMasks|Error>{
        try {
            const res=await axios.get<ItemMasks>(Requests.GET_ITEM_MASKS)
            if (res.status!=200){
                return Error("ошибка")
            }
            return res.data
        }
        catch (e) {
            return Error("ошибка")
        }
    }

    public static async GetMainCatalogItem(): Promise<Item | Error> {

        try {

            const res = await axios.get<Item>(Requests.GET_MAIN_CATALOG_ITEM)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async GetCatalogItems(item: Item): Promise<Item[] | Error> {
        if (item.id < 1) {
            return Error("ошибка")
        }



        try {

            const res = await axios.post<Item[]>(Requests.GET_CATALOG_ITEMS, Tools.unRefCatalogItem(item))
            return res.data

              /*  const response =  await fetch(Requests.GET_CATALOG_ITEMS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    mode: 'no-cors', // no-cors, *cors, same-origin
                    body: JSON.stringify(Tools.unRefCatalogItem(item)),

                })

                return await response.json();*/


        } catch (e) {
            console.log(e)
            return Error("ошибка")

        }

    }

    public static async SaveNewCatalogItem(item: Item): Promise<Item[] | Error> {

        try {

            const res = await axios.post<Item[]>(Requests.SAVE_NEW_CATALOG_ITEM, item)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async MakeCatalogItem(addToItem: AddToItem): Promise<any | Error> {


        try {
            const res = await axios.post<AddToItem>(Requests.MAKE_CATALOG_ITEM, addToItem)
            return res
        } catch (e) {
            return Error("ошибка")
        }

    }

    public static async TransferCatalogItem(transferCatalogItem: TransferCatalogItem): Promise<any | Error> {

        let sTransferCatalogItem = {
            from: Tools.unRefCatalogItem(transferCatalogItem.from),
            to: Tools.unRefCatalogItem(transferCatalogItem.to),
            item: Tools.unRefCatalogItem(transferCatalogItem.item)
        }

        try {
            const res = await axios.post<TransferCatalogItem>(Requests.TRANSFER_CATALOG_ITEM, sTransferCatalogItem)
            return res.data
        } catch (e) {
            return Error("Ошибка")
        }
    }

    public static async RenameCatalogItem(renameCatalogItem: RenameCatalogItem): Promise<any | Error> {
        renameCatalogItem.item = Tools.unRefCatalogItem(renameCatalogItem.item)
        try {
            const res = await axios.post<Item>(Requests.RENAME_CATALOG_ITEM, renameCatalogItem)
            return res

        } catch (e) {
            return Error("Ошибка")
        }
    }

    public static async RemoveCatalogItem(catalogItem: Item): Promise<any| Error> {
        if(catalogItem.owner) {
            let removeItem: RemoveItem = {
                remove_from_item: Tools.unRefCatalogItem(catalogItem.owner),
                removed_item: Tools.unRefCatalogItem(catalogItem)


        }
        try {
            const res = await axios.post<RemoveItem>(Requests.REMOVE_CATALOG_ITEM, removeItem)
            return  res

        } catch (e) {
            return Error("Ошибка")
        }
        }
    }

}