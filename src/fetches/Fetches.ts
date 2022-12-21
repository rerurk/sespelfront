import axios from "axios";

import {ReqErrors, Requests} from "./Requests";
import {AddToItem, NomenclatureItem, RemoveItem, RenameCatalogItem, TransferCatalogItem} from "../structs/nomenclature";
import {Tools} from "../tools/Tools";
import {ItemTypes} from "../structs/ItemTypes";
import {StoreAssets, UpdStore} from "../structs/StoreAssets";
import {ErrorsText} from "../texts/Texts";
import {AssetAndStore, AssetsInStore, AssetUUID, NewAsset} from "../structs/Asset";
import {Item} from "../structs/App";


export type FetchesResult = [
    ItemTypes | Error,
    Item | Error,//catalogRoot
    Item | Error//MainAssetsStorage

]

export class Fetches {


    public static async FetchAllData(): Promise<FetchesResult> {
        return Promise.all([this.GetItemTYPES(), this.GetNomenclatureRoot(), this.GetMainAssetsStorage()])
    }

    // запрос должен вернуть Массив ТМЦ и Склад AssetsInStore
    public static async GetAssetsQuantity(catalogItem:NomenclatureItem):Promise<AssetsInStore[]|Error>{

        try {
            const res=await axios.post<AssetsInStore[]>(Requests.GET_ASSETS_QUANTITY,Tools.unRefCatalogItem(catalogItem))
            if (res.status !==200) {
                return Error(ErrorsText.ERROR_GET_DATA)
            }
            return res.data
        }catch (e) {
            return Error(ErrorsText.ERROR_GET_DATA)
        }
    }

    public static async GetAssetAndStoreByUUID(uuid:string):Promise<AssetAndStore|Error>{
        let assetUUID:AssetUUID={
            uuid:uuid
        }
        try {
            const res= await axios.post<AssetAndStore>(Requests.GET_ASSET_AND_STORE_BY_UUID,assetUUID)
            if (res.status !== 200) {

                return Error()
            }
            return res.data
        }catch (e) {
            return Error(ErrorsText.ERROR_GET_DATA)
        }
    }

    public static async GetMainAssetsStorage(): Promise<Item | Error> {
        try {
            const res = await axios.get<Item>(Requests.GET_MAIN_ASSETS_STORE)

            if (res.status !== 200) {

                return Error()
            }
            return res.data
        } catch (e) {
            return Error()
        }
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

    public static async GetNomenclatureItems(item: NomenclatureItem): Promise<NomenclatureItem[] | Error> {
        if (item.id < 1) {
            return Error("ошибка")
        }


        try {

            const res = await axios.post<NomenclatureItem[]>(Requests.GET_NOMENCLATURE_ITEMS, Tools.unRefCatalogItem(item))
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

    public static async GetAllAssetsStores(): Promise<StoreAssets[] | Error> {
        try {
            const res = await axios.get<StoreAssets[]>(Requests.GET_ALL_ASSETS_STORES)
            if (res.status !== 200) {
                return Error(ErrorsText.ERROR_GET_DATA)
            }
            return res.data
        } catch (e) {
            return Error(ErrorsText.ERROR_GET_DATA)
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

    public static async MakeNomenclatureItem(addToItem: AddToItem): Promise<any | Error> {


        try {
            const res = await axios.post<AddToItem>(Requests.MAKE_NOMENCLATURE_ITEM, addToItem)
            return res
        } catch (e) {
            return Error("ошибка")
        }

    }

    public static async MakeNewStore(newStore: StoreAssets): Promise<any | Error> {
        try {

            const res = axios.post(Requests.MAKE_NEW_STORE, newStore)
            return res
        } catch (e) {
            return Error(ReqErrors.MakeStore)
        }
    }

    public static async MakeNewAsset(newAsset:NewAsset):Promise<any|Error>{
        console.log(newAsset)
        try {
            const res= await axios.post<NewAsset>(Requests.MAKE_NEW_ASSET,newAsset)
            if (res.status !== 200) {
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res

        }catch (e) {
            return Error(ErrorsText.ERROR_SEND_DATA)
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

        try {
            const res = await axios.post<RenameCatalogItem>(Requests.RENAME_CATALOG_ITEM, renameCatalogItem)
            return res

        } catch (e) {
            return Error("Ошибка")
        }
    }

    public static async RemoveCatalogItem(catalogItem: NomenclatureItem): Promise<any | Error> {
        if (catalogItem.ownerItem) {
            let removeItem: RemoveItem = {
                remove_from_item: Tools.unRefCatalogItem(catalogItem.ownerItem),
                removed_item: Tools.unRefCatalogItem(catalogItem)


            }
            try {
                const res = await axios.post<RemoveItem>(Requests.REMOVE_CATALOG_ITEM, removeItem)
                return res

            } catch (e) {
                return Error("Ошибка")
            }
        }
    }

    public static async UpdStore(upd: UpdStore): Promise<any | Error> {
        console.log(upd)
        try {
            const res = await axios.post<UpdStore>(Requests.UPD_STORE, upd)
            if (res.status !== 200) {
                return Error(ErrorsText.ERROR_SEND_DATA)
            }
            return res
        } catch (e) {
            return Error(ErrorsText.ERROR_SEND_DATA)
        }
    }


}