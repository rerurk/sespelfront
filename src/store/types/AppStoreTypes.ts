import {NomenclatureItem, Item} from "../../structs/nomenclature";
import {StoreAssets} from "../../structs/StoreAssets";
import {AssetAndStore, AssetQrCode} from "../../structs/Asset";

export type AppState={
    currentCatalog: NomenclatureItem | null// текущий выбранный каталог для отобрадения
    nomenclatureRoot: NomenclatureItem | null//корень каталога, его получаемс сервера
    currCatalogItem: NomenclatureItem | null//
    currentStore: StoreAssets | null// текущий отоброаемый склад
    currentAssetAndStore:AssetAndStore|null// текущий ТМЦ и его хранилище
    assetQrCode:AssetQrCode|null
}

export enum AppActionTypes {
    SET_CURRENT_CATALOG = "SET_CURRENT_CATALOG",
    SET_CATALOG_ROOT = 'SET_CATALOG_ROOT',
    SET_CURRENT_NOMENCLATURE_ITEM = "SET_CURRENT_NOMENCLATURE_ITEM",
    SET_CURRENT_ASSET_STORE = "SET_CURRENT_ASSET_STORE",
    SET_CURRENT_ASSET = "SET_CURRENT_ASSET",
    SET_ASSET_QRCODE="SET_ASSET_QRCODE"

}

interface SetAssetQRCodeAction{
    type:AppActionTypes.SET_ASSET_QRCODE,
    payload:AssetQrCode
}

interface SetCurrentAssetAction {
    type: AppActionTypes.SET_CURRENT_ASSET,
    payload: AssetAndStore
}

interface SetCurrentNomenclatureItemAction {
    type: AppActionTypes.SET_CURRENT_NOMENCLATURE_ITEM
    payload: NomenclatureItem
}

interface SetCurrentCatalogAction {
    type: AppActionTypes.SET_CURRENT_CATALOG
    payload: NomenclatureItem
}

interface SetCatalogRootAction {
    type: AppActionTypes.SET_CATALOG_ROOT
    payload: NomenclatureItem
}

interface SetAssetsStorage {
    type: AppActionTypes.SET_CURRENT_ASSET_STORE
    payload: StoreAssets
}

export type CatalogActions = SetCurrentCatalogAction
    | SetCatalogRootAction
    | SetCurrentNomenclatureItemAction
    | SetAssetsStorage
    | SetCurrentAssetAction
|SetAssetQRCodeAction