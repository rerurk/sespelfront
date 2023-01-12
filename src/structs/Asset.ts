import {Item} from "./App";


export type TMakeNewAsset = {
    asset_nomenclature_item: Item|null
    asset_store:Item|null
    init_fields:TInitAssetsFields

}

export type TAsset = {
    asset:Item
    store:Item
    nomenclature:Item
    init_fields:TInitAssetsFields

}
export type TInitAssetsFields={
    uuid:string
    owner:string
    serial_number: string|null
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
