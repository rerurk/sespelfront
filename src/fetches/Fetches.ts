import axios from "axios";

import {Requests} from "../requests/Requests";
import {CatalogItem} from "../structs/catalog";

export class Fetches {



    public static async GetMainCatalogItem():Promise<any|Error>{

        try {

            const res = await axios.get<string>(Requests.GET_MAIN_CATALOG_ITEM)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async GetCatalogItems(item:CatalogItem):Promise<CatalogItem[]|Error>{

        try {

            const res = await axios.post<CatalogItem[]>(Requests.GET_CATALOG_ITEMS,item)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async SaveNewCatalogItem(item:CatalogItem):Promise<CatalogItem[]|Error>{

        try {

            const res = await axios.post<CatalogItem[]>(Requests.SAVE_NEW_CATALOG_ITEM,item)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

}