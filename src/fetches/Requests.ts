const domen = "http://192.168.1.56:8080"
//const domen = ""
type RequestT = {
    MAKE_ITEM:string,
    TRANSFER_ITEM:string,
    MODIFY_ITEM:string,
    REMOVE_ITEM:string,
    GET_ITEM_TYPES:string,
    GET_NOMENCLATURE_ROOT:string
    GET_STORE_GROUP_ROOT:string
    GET_ITEMS:string
}

enum req {
    MAKE_ITEM="/make_item",
    TRANSFER_ITEM="/transfer_item",
    MODIFY_ITEM="/modify_item",
    REMOVE_ITEM="/remove_item",
    GET_ITEM_TYPES="/get_item_types",
    GET_NOMENCLATURE_ROOT="/get_nomenclature_root",
    GET_STORE_GROUP_ROOT="/get_store_group_root",
    GET_ITEMS="/get_items"

}

export const Requests: RequestT = {
    MAKE_ITEM: domen+req.MAKE_ITEM,
    MODIFY_ITEM: domen+req.MODIFY_ITEM,
    REMOVE_ITEM: domen+req.REMOVE_ITEM,
    TRANSFER_ITEM: domen+req.TRANSFER_ITEM,
    GET_ITEM_TYPES:domen+req.GET_ITEM_TYPES,
    GET_NOMENCLATURE_ROOT:domen+req.GET_NOMENCLATURE_ROOT,
    GET_STORE_GROUP_ROOT:domen+req.GET_STORE_GROUP_ROOT,
    GET_ITEMS:domen+req.GET_ITEMS
}


type RequestErrors = {
    GetData: string
    MakeStore: string
}

export const ReqErrors: RequestErrors = {
    GetData: "Ошибка получения данных",
    MakeStore: " Ошибка создания склада при запросе на серевер"

}
