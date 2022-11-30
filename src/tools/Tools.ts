import {CatalogItem} from "../structs/catalog";

export class Tools {
    public static getCatalogItem(it:CatalogItem):CatalogItem{
        return {
            id: it.id,
            items: null,
            mask: it.mask,
            name: it.name,
            parent: null,
            ref: it.ref

        }
    }
}