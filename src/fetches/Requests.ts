const domen = "http://192.168.1.103:3005"

type RequestT = {
    SAVE_NEW_ASSET:string,
    GET_MAIN_CATALOG_ITEM:string,
    SAVE_NEW_CATALOG_NODE:string,
    GET_CATALOG_ITEMS :string,
    SAVE_NEW_CATALOG_ITEM :string,
    MAKE_CATALOG_ITEM :string,
    TRANSFER_CATALOG_ITEM :string,
    RENAME_CATALOG_ITEM :string,
    REMOVE_CATALOG_ITEM:string,
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
    REMOVE_CATALOG_ITEM = "/remove_catalog_item"

}
export const Requests: RequestT = {
    GET_CATALOG_ITEMS: domen +req.GET_CATALOG_ITEMS,
    GET_MAIN_CATALOG_ITEM: domen +req.GET_MAIN_CATALOG_ITEM,
    MAKE_CATALOG_ITEM: domen +req.MAKE_CATALOG_ITEM,
    REMOVE_CATALOG_ITEM: domen +req.REMOVE_CATALOG_ITEM,
    RENAME_CATALOG_ITEM: domen +req.RENAME_CATALOG_ITEM,
    SAVE_NEW_CATALOG_ITEM: domen +req.SAVE_NEW_CATALOG_ITEM,
    SAVE_NEW_CATALOG_NODE: domen +req.SAVE_NEW_CATALOG_NODE,
    TRANSFER_CATALOG_ITEM: domen +req.TRANSFER_CATALOG_ITEM,
    SAVE_NEW_ASSET :domen +req.SAVE_NEW_ASSET
}


/*
export enum Requests {
    
    SAVE_NEW_ASSET = "http://192.168.5.136:3005/save_new_asset",
    GET_MAIN_CATALOG_ITEM = "http://192.168.5.136:3005/get_main_catalog_item",
    SAVE_NEW_CATALOG_NODE = "http://192.168.5.136:3005/save_new_catalog_node",
    GET_CATALOG_ITEMS = "http://192.168.5.136:3005/get_catalog_items",
    SAVE_NEW_CATALOG_ITEM = "http://192.168.5.136:3005/save_new_catalog_item",
    MAKE_CATALOG_ITEM = "http://192.168.5.136:3005/make_catalog_item",
    TRANSFER_CATALOG_ITEM = "http://192.168.5.136:3005/transfer_catalog_item",
    RENAME_CATALOG_ITEM = "http://192.168.5.136:3005/rename_catalog_item",
    REMOVE_CATALOG_ITEM = "http://192.168.5.136:3005/remove_catalog_item"

}*/
