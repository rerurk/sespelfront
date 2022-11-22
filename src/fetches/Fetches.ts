import axios from "axios";
import {Asset} from "../structs/Asset";
import {Requests} from "../requests/Requests";
import {NewAsset} from "../structs/transportSructs";
import {CatalogNode} from "../structs/catalog";



export class Fetches {

    public static async SaveNewAsset(newAsset:NewAsset): Promise<any | Error> {
        try {

            const res = await axios.post<Asset>(Requests.SAVE_NEW_ASSET, newAsset)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }

    }

    public static async GetCatalogNode(nodeName:string):Promise<any|Error>{
        try {

            const res = await axios.post<string>(Requests.GET_CATALOG_NODE, nodeName)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

}