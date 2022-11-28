const domen = "http://192.168.1.103"

export enum Requests {
    SAVE_NEW_ASSET = "http://192.168.1.103:3005/save_new_asset",
    GET_MAIN_CATALOG_ITEM = "http://192.168.1.103:3005/get_main_catalog_item",
    SAVE_NEW_CATALOG_NODE = "http://192.168.1.103:3005/save_new_catalog_node",
    GET_CATALOG_ITEMS = "http://192.168.1.103:3005/get_catalog_items",
    SAVE_NEW_CATALOG_ITEM = "http://192.168.1.103:3005/save_new_catalog_item",
    MAKE_CATALOG_ITEM = "http://192.168.1.103:3005/make_catalog_item",
    TRANSFER_CATALOG_ITEM = "http://192.168.1.103:3005/transfer_catalog_item",
    RENAME_CATALOG_ITEM = "http://192.168.1.103:3005/rename_catalog_item"

}