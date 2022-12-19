import {NomenclatureItem, Item} from "../structs/nomenclature";
import {TAddress} from "../components/UI/address/Address";


type CatalogItemLS = {
    isOpen: boolean | undefined
    date: string
}

export class Tools {
    public static unRefCatalogItem(it: NomenclatureItem): Item {
        return {
            id: it.id,
            mask: it.mask,
            name: it.name,
            owner_uuid: it.owner_uuid,
            uuid: it.uuid
        }
    }

    public static SaveCatalogItemFields(catalogItem: NomenclatureItem) {
        if (catalogItem.uuid) {
            let catItLS: CatalogItemLS = {
                isOpen: catalogItem.isOpen,
                date: Date.now().toString()
            }

            localStorage.setItem(catalogItem.uuid, JSON.stringify(catItLS))

        }
    }

    public static LoadCatalogItemFields(catalogItem: NomenclatureItem) {
        let str: string | null
        if (catalogItem.uuid) {
            str = localStorage.getItem(catalogItem.uuid)

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


    }

    public static SaveFrontSize(n: number) {
        localStorage.setItem("fontSize", String(n))
    }

    public static LoadFontSize(): number | null {
        let nstr: string | null = localStorage.getItem("fontSize")
        if (nstr) {
            let n: number = Number(nstr)
        }
        return null

    }

    public static GetStringAddress(address:TAddress):string{
        return address.region + ", " + address.city + ", " + address.street + ", " + address.building + ", " + address.phone
    }

}