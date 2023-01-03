import {Item} from "./App";


export type TMakeNewAsset = {
    asset_nomenclature_item: Item|null
    asset_store:Item|null

}

export type TAsset = {
    asset:Item
    store:Item
    nomenclature:Item
}

export type AssetQrCodeFields ={
    assetNomenclatureName:string,
    assetUUID:string,

}

export type AssetHistory= {
    store: Item
    create_time: string

}
export type AssetsUUIDByNomenclItem ={
    nomencl_item:Item,
    assets_uuid:string[]
}

/*
type AssetQuantity struct {
	Name     string `json:"name"`
	AssetsUUID [] string `json:"assets_uuid"`
} */

/*
export type AssetsInStore ={
    store:Item
    assets:Item[]
}


export type AssetAndStore ={
    current_store:Item
    catalog_item:Item
    asset:Item
}


export type AssetUUID ={
    uuid:string
}*/
export type AssetQrCode ={
    code:string
    assetCatalogName:string
}
