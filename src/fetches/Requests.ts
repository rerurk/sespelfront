const domen = "http://192.168.1.95:3005"

type RequestT = {
    SAVE_NEW_ASSET: string,
    GET_MAIN_CATALOG_ITEM: string,
    SAVE_NEW_CATALOG_NODE: string,
    GET_CATALOG_ITEMS: string,
    SAVE_NEW_CATALOG_ITEM: string,
    MAKE_CATALOG_ITEM: string,
    TRANSFER_CATALOG_ITEM: string,
    RENAME_CATALOG_ITEM: string,
    REMOVE_CATALOG_ITEM: string,
    GET_ITEM_MASKS: string
    GET_MAIN_ASSETS_STORE: string
    GET_ALL_ASSETS_STORES: string
    MAKE_NEW_STORE: string
}

enum req {

    SAVE_NEW_ASSET = "/save_new_asset",
    GET_MAIN_CATALOG_ITEM = "/get_main_catalog_item",
    SAVE_NEW_CATALOG_NODE = "/save_new_catalog_node",
    GET_CATALOG_ITEMS = "/get_catalog_items",
    SAVE_NEW_CATALOG_ITEM = "/save_new_catalog_item",
    MAKE_CATALOG_ITEM = "/make_catalog_item",
    TRANSFER_CATALOG_ITEM = "/transfer_catalog_item",
    RENAME_CATALOG_ITEM = "/rename_catalog_item",
    REMOVE_CATALOG_ITEM = "/remove_catalog_item",
    GET_ITEM_MASKS = "/get_item_masks",
    GET_MAIN_ASSETS_STORE = '/get_main_assets_store',
    GET_ALL_ASSETS_STORES = "/get_all_assets_stores",
    MAKE_NEW_STORE = "/make_new_store"


}

export const Requests: RequestT = {
    GET_CATALOG_ITEMS: domen + req.GET_CATALOG_ITEMS,
    GET_MAIN_CATALOG_ITEM: domen + req.GET_MAIN_CATALOG_ITEM,
    MAKE_CATALOG_ITEM: domen + req.MAKE_CATALOG_ITEM,
    REMOVE_CATALOG_ITEM: domen + req.REMOVE_CATALOG_ITEM,
    RENAME_CATALOG_ITEM: domen + req.RENAME_CATALOG_ITEM,
    SAVE_NEW_CATALOG_ITEM: domen + req.SAVE_NEW_CATALOG_ITEM,
    SAVE_NEW_CATALOG_NODE: domen + req.SAVE_NEW_CATALOG_NODE,
    TRANSFER_CATALOG_ITEM: domen + req.TRANSFER_CATALOG_ITEM,
    SAVE_NEW_ASSET: domen + req.SAVE_NEW_ASSET,
    GET_ITEM_MASKS: domen + req.GET_ITEM_MASKS,
    GET_MAIN_ASSETS_STORE: domen + req.GET_MAIN_ASSETS_STORE,
    GET_ALL_ASSETS_STORES: domen + req.GET_ALL_ASSETS_STORES,
    MAKE_NEW_STORE: domen + req.MAKE_NEW_STORE

}


type RequestErrors = {
    GetData: string
    MakeStore:string
}

export const ReqErrors: RequestErrors = {
    GetData: "Ошибка получения данных",
    MakeStore:" Ошибка создания склада при запросе на серевер"

}
