import axios from "axios";

import {ReqErrors, Requests} from "./Requests";
import {ItemTypes} from "../structs/ItemTypes";
import {ErrorsText} from "../texts/Texts";
import {
    AddNomenclatureItem,
    AddToItem, AuthRes,
    ExtendedItem,
    Item,
    RenameItem,
    RenameNomenclatureItem,
    StrUUID,
    TransferItem, USRAuth
} from "../structs/App";
import {AssetHistory, TAsset, TMakeNewAsset} from "../structs/Asset";
import {StoreBalance} from "../structs/storesTypes";


export type FetchesResult = [
    ItemTypes | Error,
    Item | Error,//catalogRoot
    Item | Error//MainAssetsStorage

]

export class Fetches{

    public static async Authorization(usr:USRAuth): Promise<AuthRes | Error> {
        try {
            const res = await axios.post<AuthRes>(Requests.AUTHORIZATION,usr)
            if (res.status !== 200) {
                return Error("ошибка")
            }
            return res.data
        } catch (e) {
            return Error(ReqErrors.GetData)
        }
    }

    public static async GetAuthStatus(): Promise<AuthRes | Error> {
        try {
            const res = await axios.post<AuthRes>(Requests.GET_AUTH_STATUS)
            if (res.status !== 200) {
                return Error("ошибка")
            }
            return res.data
        } catch (e) {
            return Error(ReqErrors.GetData)
        }
    }

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

    public static async GetNomenclatureRoot(): Promise<ExtendedItem | Error> {

        try {

            const res = await axios.get<ExtendedItem>(Requests.GET_NOMENCLATURE_ROOT)
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

    public static async GetItems(item: Item): Promise<ExtendedItem[] | Error> {
        if (item.id < 1) {
            return Error("ошибка")
        }

        try {

            const res = await axios.post<ExtendedItem[]>(Requests.GET_ITEMS, item)
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
            const res = await axios.post<TransferItem>(Requests.TRANSFER_ITEM, transferItem)
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
            alert("Ошибка")
            return Error("Ошибка")
        }
    }

    public static async RemoveItem(item: Item): Promise<any | Error> {

        try {
            const res = await axios.post<Item>(Requests.REMOVE_ITEM, item)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res

        } catch (e) {
            alert("Ошибка")
            return Error("Ошибка")
        }
    }

    public static async MakeAsset(makeNewAsset:TMakeNewAsset): Promise<TAsset | Error> {

        try {
            const res = await axios.post<TAsset>(Requests.MAKE_ASSET, makeNewAsset)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res.data

        } catch (e) {
            alert("Ошибка")
            return Error("Ошибка")
        }
    }

    public static async GetNotAcceptedAssets ():Promise<TAsset[]|Error>{
        try {


            const res = await axios.get<TAsset[]>(Requests.GET_NOT_ACCEPTED_ASSETS)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res.data
        }
        catch (e) {
            alert("Ошибка")
            return Error("Ошибка")
        }
    }

    public static async GetAssetBySTRUUID (strSend:StrUUID):Promise<TAsset|Error>{
        try {


            const res = await axios.post<TAsset>(Requests.GET_ASSET_BY_UUID,strSend)
            if (res.status !== 200) {

                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res.data
        }
        catch (e) {
            alert("Ошибка")
            return Error("Ошибка")
        }
    }

    public static async MakeNomenclatureItem(item: AddNomenclatureItem): Promise<any | Error> {
        try {
            const res = await axios.post(Requests.MAKE_NOMENCLATURE_ITEM, item)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res
        } catch (e) {
            return Error("ошибка")
        }

    }

    public static async ModifyNomenclatureItem(renameItem: RenameNomenclatureItem): Promise<any | Error> {

        try {
            const res = await axios.post<RenameItem>(Requests.MODIFY_NOMENCLATURE_ITEM, renameItem)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res

        } catch (e) {
            alert("Ошибка")
            return Error("Ошибка")
        }
    }

    public static async GetAssetTransferHistory (uuid:StrUUID):Promise<AssetHistory[]|Error>{
        try {


            const res = await axios.post<AssetHistory[]>(Requests.GET_ASSET_TRANSFER_HISTORY,uuid)
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res.data
        }
        catch (e) {
            alert("Ошибка")
            return Error("Ошибка")
        }
    }

    public static async GetStoreBalance (storeItem:Item):Promise<StoreBalance|Error>{
        try {


            const res = await axios.post<StoreBalance>(Requests.GET_STORE_BALANCE,storeItem)
            if (res.status == 404) {

                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            if (res.status !== 200) {
                alert(res.data)
                return Error(ErrorsText.ERROR_SEND_DATA)
            }

            return res.data
        }
        catch (e) {
            alert("Ошибка")
            return Error("Ошибка")
        }
    }




}