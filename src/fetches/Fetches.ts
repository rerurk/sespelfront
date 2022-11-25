import axios from "axios";

import {Requests} from "../requests/Requests";
import {AddToItem, CatalogItem, ReplaceCatalogItem} from "../structs/catalog";

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

    public static async AddCatalogItemToCatalogItem(addToItem: AddToItem): Promise<any | Error> {

        try {
            const res = await axios.post<AddToItem>(Requests.SAVE_NEW_CATALOG_ITEM, addToItem)
            return res.data
        } catch (e) {
            return Error("ошибка")
        }

    }

    public static async ReplaceCatalogItem(replaceItem: ReplaceCatalogItem): Promise<any | Error> {
        console.log("public static async ReplaceCatalogItem:",replaceItem)
        try {
            const res = await axios.post<ReplaceCatalogItem>(Requests.REPLACE_CATALOG_ITEM, replaceItem)
            return res.data
        }catch (e) {
            return Error("Ошибка")
        }
        }

}