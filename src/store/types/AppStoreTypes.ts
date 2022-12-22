import {NomenclatureItem} from "../../structs/nomenclature";
import {StoreAssets, StoreItem} from "../../structs/StoreAssets";
import {AssetAndStore, AssetQrCode} from "../../structs/Asset";


export type AppState = {
    selectedNomenclatureGroup: NomenclatureItem | null// текущий выбранный каталог для отобрадения
    nomenclatureRoot: NomenclatureItem | null//корень каталога, его получаемс сервера
    currCatalogItem: NomenclatureItem | null//
    storeGroupRoot: StoreItem | null
    selectedStoreGroup: StoreItem | null// текущий выбранный каталог для отобрадения
    currentStore: StoreAssets | null// текущий отоброаемый склад
    currentAssetAndStore: AssetAndStore | null// текущий ТМЦ и его хранилище
    assetQrCode: AssetQrCode | null
}

export enum AppActionTypes {

    SET_NOMENCLATURE_ROOT = 'SET_NOMENCLATURE_ROOT',
    SET_STORE_GROUP_ROOT = "SET_STORE_GROUP_ROOT",
    SET_SELECTED_NOMENCLATURE_GROUP = "SET_SELECTED_NOMENCLATURE_GROUP",
    SET_SELECTED_STORE_GROUP = "SET_SELECTED_STORE_GROUP",
    SET_CURRENT_NOMENCLATURE_ITEM = "SET_CURRENT_NOMENCLATURE_ITEM",
    SET_CURRENT_ASSET_STORE = "SET_CURRENT_ASSET_STORE",
    SET_CURRENT_ASSET = "SET_CURRENT_ASSET",
    SET_ASSET_QRCODE = "SET_ASSET_QRCODE"

}

interface SetStoreGroupRootAction {
    type: AppActionTypes.SET_STORE_GROUP_ROOT
    payload: StoreItem
}

interface SetCatalogRootAction {
    type: AppActionTypes.SET_NOMENCLATURE_ROOT
    payload: NomenclatureItem
}

interface SetAssetQRCodeAction {
    type: AppActionTypes.SET_ASSET_QRCODE,
    payload: AssetQrCode
}

interface SetCurrentAssetAction {
    type: AppActionTypes.SET_CURRENT_ASSET,
    payload: AssetAndStore
}

interface SetCurrentNomenclatureItemAction {
    type: AppActionTypes.SET_CURRENT_NOMENCLATURE_ITEM
    payload: NomenclatureItem
}

interface SetSelectedNomenclatureGroupAction {
    type: AppActionTypes.SET_SELECTED_NOMENCLATURE_GROUP
    payload: NomenclatureItem
}

interface SetSelectedStoreGroupAction {
    type: AppActionTypes.SET_SELECTED_STORE_GROUP
    payload: NomenclatureItem
}

interface SetAssetsStorageAction {
    type: AppActionTypes.SET_CURRENT_ASSET_STORE
    payload: StoreAssets
}

export type AppActions = SetSelectedNomenclatureGroupAction
    | SetCatalogRootAction
    | SetCurrentNomenclatureItemAction
    | SetAssetsStorageAction
    | SetCurrentAssetAction
    | SetAssetQRCodeAction
    | SetStoreGroupRootAction
    | SetSelectedStoreGroupAction