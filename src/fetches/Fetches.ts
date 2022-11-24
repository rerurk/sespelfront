import axios from "axios";

import {Requests} from "../requests/Requests";

export class Fetches {



    public static async GetMainCatalogItem():Promise<any|Error>{

        try {

            const res = await axios.get<string>(Requests.GET_MAIN_CATALOG_ITEM)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }


}