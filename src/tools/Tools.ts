import {CatalogItem} from "../structs/catalog";

export class Tools {
    public static unRefCatalogItem(it:CatalogItem):CatalogItem{
        return {
            id: it.id,
            items: null,
            mask: it.mask,
            name: it.name,
            owner: null,
            ref: it.ref

        }
    }
}