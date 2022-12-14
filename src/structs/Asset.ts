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

export type QrCodeFields ={
    name:string,
    code:string,

}

export type AssetHistory= {
    store: Item
    create_time: string

}
export type NomenclItemAndHisUUIDS ={
    nomencl_item:Item,
    uuid_times:uuid_time[]
}


// актуальный uuid и время создания
export type uuid_time={
    uuid:string,
    time:string
}

export type AssetQrCode ={
    code:string
    assetCatalogName:string
}
