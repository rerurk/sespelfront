const domen = "http://192.168.1.103"

export enum Requests {
    SAVE_NEW_ASSET = "http://192.168.1.103:3005/save_new_asset",
    GET_MAIN_CATALOG_ITEM = "http://192.168.1.103:3005/get_main_catalog_item",
    SAVE_NEW_CATALOG_NODE = "http://192.168.1.103:3005/save_new_catalog_node",
    GET_CATALOG_ITEMS = "http://192.168.1.103:3005/get_catalog_items",
    SAVE_NEW_CATALOG_ITEM = "http://192.168.1.103:3005/save_new_catalog_item",
    ADD_CATALOG_ITEM_TO_CATALOG_ITEM = "http://192.168.1.103:3005/add_catalog_item_to_catalog_item",
    REPLACE_CATALOG_ITEM = "http://192.168.1.103:3005/replace_catalog_item"

}