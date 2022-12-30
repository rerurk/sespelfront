export const Domen = "https://192.168.1.95"
//const Domen = ""
type RequestT = {
    MAKE_ITEM: string,
    TRANSFER_ITEM: string,
    MODIFY_ITEM: string,
    REMOVE_ITEM: string,
    GET_ITEM_TYPES: string,
    GET_NOMENCLATURE_ROOT: string
    GET_STORE_GROUP_ROOT: string
    GET_ITEMS: string
    MAKE_ASSET: string
    GET_NOT_ACCEPTED_ASSETS: string
    GET_ASSET_BY_UUID: string
    MAKE_NOMENCLATURE_ITEM: string
    MODIFY_NOMENCLATURE_ITEM: string,
    GET_ASSET_TRANSFER_HISTORY: string
}

enum req {
    MAKE_ITEM = "/make_item",
    TRANSFER_ITEM = "/transfer_item",
    MODIFY_ITEM = "/modify_item",
    REMOVE_ITEM = "/remove_item",
    GET_ITEM_TYPES = "/get_item_types",
    GET_NOMENCLATURE_ROOT = "/get_nomenclature_root",
    GET_STORE_GROUP_ROOT = "/get_store_group_root",
    GET_ITEMS = "/get_items",
    //???
    MAKE_ASSET = "/make_asset",
    GET_NOT_ACCEPTED_ASSETS = "/get_not_accepted_assets",
    GET_ASSET_BY_UUID = "/get_asset_by_uuid",
    //это отдельно потомучто может нужна будет картинка
    MAKE_NOMENCLATURE_ITEM = "/make_nomenclature_item",
    MODIFY_NOMENCLATURE_ITEM = "/modify_nomenclature_item",
    GET_ASSET_TRANSFER_HISTORY = "/get_asset_transfer_history"
}

export const Requests: RequestT = {
    MAKE_ITEM: Domen + req.MAKE_ITEM,
    MODIFY_ITEM: Domen + req.MODIFY_ITEM,
    REMOVE_ITEM: Domen + req.REMOVE_ITEM,
    TRANSFER_ITEM: Domen + req.TRANSFER_ITEM,
    GET_ITEM_TYPES: Domen + req.GET_ITEM_TYPES,
    GET_NOMENCLATURE_ROOT: Domen + req.GET_NOMENCLATURE_ROOT,
    GET_STORE_GROUP_ROOT: Domen + req.GET_STORE_GROUP_ROOT,
    GET_ITEMS: Domen + req.GET_ITEMS,

    MAKE_ASSET: Domen + req.MAKE_ASSET,
    GET_NOT_ACCEPTED_ASSETS: Domen + req.GET_NOT_ACCEPTED_ASSETS,
    GET_ASSET_BY_UUID: Domen + req.GET_ASSET_BY_UUID,
    MAKE_NOMENCLATURE_ITEM: Domen + req.MAKE_NOMENCLATURE_ITEM,
    MODIFY_NOMENCLATURE_ITEM: Domen + req.MODIFY_NOMENCLATURE_ITEM,
    GET_ASSET_TRANSFER_HISTORY:Domen+req.GET_ASSET_TRANSFER_HISTORY
}


type RequestErrors = {
    GetData: string
    MakeStore: string
}

export const ReqErrors: RequestErrors = {
    GetData: "Ошибка получения данных",
    MakeStore: " Ошибка создания склада при запросе на серевер"

}
