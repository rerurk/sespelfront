const domen = "http://192.168.1.95:8080"
//const domen = ""
type RequestT = {
    MAKE_NEW_ASSET: string,
    GET_NOMENCLATURE_ROOT: string,
    GET_NOMENCLATURE_ITEMS: string,
    SAVE_NEW_CATALOG_ITEM: string,
    MAKE_NOMENCLATURE_ITEM: string,
    TRANSFER_CATALOG_ITEM: string,
    RENAME_CATALOG_ITEM: string,
    REMOVE_CATALOG_ITEM: string,
    GET_ITEM_TYPES: string
    GET_MAIN_ASSETS_STORE: string
    GET_ASSETS_QUANTITY:string// (Item)=>AssetsInStore[]
    GET_ASSET_AND_STORE_BY_UUID:string //(assetUUID:string)=>Item (Asset)| Item где id <1
    GET_ALL_ASSETS_STORES: string
    MAKE_NEW_STORE: string
    UPD_STORE: string
}

enum req {


    GET_NOMENCLATURE_ROOT = "/get_nomenclature_root",
    GET_NOMENCLATURE_ITEMS = "/get_nomenclature_items",
    SAVE_NEW_CATALOG_NODE = "/save_new_catalog_node",

    SAVE_NEW_CATALOG_ITEM = "/save_new_catalog_item",
    MAKE_NOMENCLATURE_ITEM = "/make_nomenclature_item",
    MAKE_NEW_STORE = "/make_new_store",
    MAKE_NEW_ASSET = "/make_new_asset",
    TRANSFER_CATALOG_ITEM = "/transfer_catalog_item",
    RENAME_CATALOG_ITEM = "/rename_catalog_item",
    REMOVE_CATALOG_ITEM = "/remove_catalog_item",
    GET_ITEM_TYPES = "/get_item_types",
    GET_MAIN_ASSETS_STORE = '/get_main_assets_store',
    GET_ALL_ASSETS_STORES = "/get_all_assets_stores",
    GET_ASSET_AND_STORE_BY_UUID="/get_asset_and_store_by_uuid", //(assetuuid:string)=>:AssetAndStore
    GET_ASSETS_QUANTITY="/get_assets_quantity",// (Item)=>AssetsInStore[]
    UPD_STORE = "/upd_store"
}

export const Requests: RequestT = {
    GET_NOMENCLATURE_ROOT: domen + req.GET_NOMENCLATURE_ROOT,
    GET_NOMENCLATURE_ITEMS: domen + req.GET_NOMENCLATURE_ITEMS,
    MAKE_NOMENCLATURE_ITEM: domen + req.MAKE_NOMENCLATURE_ITEM,
    REMOVE_CATALOG_ITEM: domen + req.REMOVE_CATALOG_ITEM,
    RENAME_CATALOG_ITEM: domen + req.RENAME_CATALOG_ITEM,
    SAVE_NEW_CATALOG_ITEM: domen + req.SAVE_NEW_CATALOG_ITEM,
    TRANSFER_CATALOG_ITEM: domen + req.TRANSFER_CATALOG_ITEM,
    MAKE_NEW_ASSET: domen + req.MAKE_NEW_ASSET,
    GET_ITEM_TYPES: domen + req.GET_ITEM_TYPES,
    GET_MAIN_ASSETS_STORE: domen + req.GET_MAIN_ASSETS_STORE,
    GET_ALL_ASSETS_STORES: domen + req.GET_ALL_ASSETS_STORES,
    MAKE_NEW_STORE: domen + req.MAKE_NEW_STORE,
    UPD_STORE: domen + req.UPD_STORE,
    GET_ASSETS_QUANTITY:domen+req.GET_ASSETS_QUANTITY,
    GET_ASSET_AND_STORE_BY_UUID:domen+req.GET_ASSET_AND_STORE_BY_UUID

}


type RequestErrors = {
    GetData: string
    MakeStore: string
}

export const ReqErrors: RequestErrors = {
    GetData: "Ошибка получения данных",
    MakeStore: " Ошибка создания склада при запросе на серевер"

}
