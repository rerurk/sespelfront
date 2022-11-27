import axios from "axios";

import {Requests} from "./Requests";
import {AddToItem, CatalogItem, CatalogNode, ReplacesCatalogItem} from "../structs/catalog";

export class Fetches {


    public static async GetMainCatalogItem(): Promise<any | Error> {

        try {

            const res = await axios.get<string>(Requests.GET_MAIN_CATALOG_ITEM)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async GetCatalogItems(item: CatalogItem): Promise<CatalogItem[] | Error> {

        try {

            const res = await axios.post<CatalogItem[]>(Requests.GET_CATALOG_ITEMS, item)
            return res.data
            /*    const response =  await fetch(Requests.GET_CATALOG_ITEMS, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    mode: 'no-cors', // no-cors, *cors, same-origin
                    body: JSON.stringify(item),

                })

                return await response.json();*/


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async SaveNewCatalogItem(item: CatalogItem): Promise<CatalogItem[] | Error> {

        try {

            const res = await axios.post<CatalogItem[]>(Requests.SAVE_NEW_CATALOG_ITEM, item)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async MakeCatalogItem(addToItem: AddToItem): Promise<any | Error> {
        console.log("public static async MakeCatalogItem:", addToItem)

        try {
            const res = await axios.post<AddToItem>(Requests.MAKE_CATALOG_ITEM, addToItem)
            return res.data
        } catch (e) {
            return Error("ошибка")
        }

    }

    public static async ReplaceCatalogItem(replaceItem: ReplacesCatalogItem): Promise<any | Error> {

        try {
            const res = await axios.post<ReplacesCatalogItem>(Requests.REPLACE_CATALOG_ITEM, replaceItem)
            return res.data
        } catch (e) {
            return Error("Ошибка")
        }
    }

    public static async RenameCatalogItem(catalogNode: CatalogNode): Promise<any | Error> {

        try {
            const res = await axios.post<CatalogNode>(Requests.RENAME_CATALOG_ITEM, catalogNode)
            return res.data

        }catch (e) {
            return Error("Ошибка")
        }
    }

}