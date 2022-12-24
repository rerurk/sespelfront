import axios from "axios";

import {ReqErrors, Requests} from "./Requests";
import {NomenclatureItem, RemoveItem, TransferNomenclatureItem} from "../structs/nomenclature";
import {Tools} from "../tools/Tools";
import {ItemTypes} from "../structs/ItemTypes";

import {ErrorsText} from "../texts/Texts";
import {AssetAndStore, AssetsInStore, AssetUUID, NewAsset} from "../structs/Asset";
import {AddToItem, Item, RenameItem, TransferItem} from "../structs/App";


export type FetchesResult = [
    ItemTypes | Error,
    Item | Error,//catalogRoot
    Item | Error//MainAssetsStorage

]

export class Fetches {


    public static async FetchAllData(): Promise<FetchesResult> {
        return Promise.all([this.GetItemTYPES(), this.GetNomenclatureRoot(), this.GetStoreGroupRoot()])
    }



    public static async GetItemTYPES(): Promise<ItemTypes | Error> {
        try {
            const res = await axios.get<ItemTypes>(Requests.GET_ITEM_TYPES)
            if (res.status !== 200) {
                return Error("ошибка")
            }
            return res.data
        } catch (e) {
            return Error(ReqErrors.GetData)
        }
    }

    public static async GetNomenclatureRoot(): Promise<NomenclatureItem | Error> {

        try {

            const res = await axios.get<NomenclatureItem >(Requests.GET_NOMENCLATURE_ROOT)
            return res.data


        } catch (e) {
            return Error("ошибка")

        }
    }

    public static async GetStoreGroupRoot(): Promise<Item | Error> {
        try {
            const res = await axios.get<Item>(Requests.GET_STORE_GROUP_ROOT)

            if (res.status !== 200) {

                return Error()
            }
            return res.data
        } catch (e) {
            return Error()
        }
    }

    public static async GetItems(item: Item): Promise<NomenclatureItem[] | Error> {
        if (item.id < 1) {
            return Error("ошибка")
        }

        try {

            const res = await axios.post<NomenclatureItem[]>(Requests.GET_ITEMS, item)
            if (res.status !== 200) {

                return Error()
            }
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

    public static async TransferItem(transferItem: TransferItem): Promise<any | Error> {

        try {
            const res = await axios.post<TransferNomenclatureItem>(Requests.TRANSFER_ITEM, transferItem)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res.data
        } catch (e) {
            return Error("Ошибка")
        }
    }

    public static async MakeItem(addToItem: AddToItem): Promise<any | Error> {


        try {
            const res = await axios.post<AddToItem>(Requests.MAKE_ITEM, addToItem)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res
        } catch (e) {
            return Error("ошибка")
        }

    }

    public static async ModifyItem(renameItem: RenameItem): Promise<any | Error> {

        try {
            const res = await axios.post<RenameItem>(Requests.MODIFY_ITEM, renameItem)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res

        } catch (e) {
            return Error("Ошибка")
        }
    }





}