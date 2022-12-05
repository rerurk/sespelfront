import {CatalogItem} from "../structs/catalog";


type CatalogItemLS = {
    isOpen: boolean | undefined
    date: string
}

export class Tools {
    public static unRefCatalogItem(it: CatalogItem): CatalogItem {
        return {
            id: it.id,
            items: null,
            mask: it.mask,
            name: it.name,
            owner: null,
            ref: it.ref


        }
    }

    public static SaveCatalogItemFields(catalogItem: CatalogItem) {

        let catItLS: CatalogItemLS = {
            isOpen: catalogItem.isOpen,
            date: Date.now().toString()
        }
        localStorage.setItem(catalogItem.ref, JSON.stringify(catItLS))


    }

    public static LoadCatalogItemFields(catalogItem: CatalogItem) {
        let str: string | null

        str = localStorage.getItem(catalogItem.ref)

        let catItLS: CatalogItemLS
        if (str) {
            try {
                catItLS = JSON.parse(str)
                catalogItem.isOpen = catItLS.isOpen
            } catch (e) {
                catalogItem.isOpen = false
            }

        }


    }

    public static SaveFrontSize(n: number) {
        localStorage.setItem("fontSize", String(n))
    }

    public static LoadFontSize(): number|null {
        let nstr: string | null = localStorage.getItem("fontSize")
        if (nstr) {
            let n: number = Number(nstr)
        }
        return null

    }

}