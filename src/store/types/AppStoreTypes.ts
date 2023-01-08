import {AssetQrCode, QrCodeFields, TAsset} from "../../structs/Asset";
import {ExtendedItem} from "../../structs/App";
import {StoreBalance} from "../../structs/storesTypes";


export type AppState = {
    isAuth: boolean
    nomenclatureRoot: ExtendedItem | null//корень каталога, его получаемс сервера
    storeGroupRoot: ExtendedItem | null
    selectedNomenclatureItem: ExtendedItem | null//
    // текущий выбранный каталог для отобрадения
    selectedNomenclatureGroup: ExtendedItem | null
    // текущий выбранный каталог для отобрадения
    selectedStoreGroup: ExtendedItem | null
    // текущий отоброаемый склад
    selectedStore: ExtendedItem | null
    selectedAsset: TAsset | null
    storeBalance: StoreBalance | null
    qrCodes: QrCodeFields[] | null

}

export enum AppActionTypes {
    SET_IS_AUTH = "SET_IS_AUTH",
    SET_NOMENCLATURE_ROOT = 'SET_NOMENCLATURE_ROOT',
    SET_STORE_GROUP_ROOT = "SET_STORE_GROUP_ROOT",
    SET_SELECTED_NOMENCLATURE_GROUP = "SET_SELECTED_NOMENCLATURE_GROUP",
    SET_SELECTED_STORE_GROUP = "SET_SELECTED_STORE_GROUP",
    SET_SELECTED_NOMENCLATURE_ITEM = "SET_SELECTED_NOMENCLATURE_ITEM",
    SET_SELECTED_ASSET_STORE = "SET_SELECTED_ASSET_STORE",
    SET_SELECTED_ASSET = "SET_SELECTED_ASSET",
    SET_ASSET_QRCODE = "SET_ASSET_QRCODE",
    SET_STORE_BALANCE = "SET_STORE_BALANCE",
    SET_SELECTED_ASSETS = "SET_SELECTED_ASSETS",
    ADD_QR_CODE = "ADD_QR_CODE",
    REMOVE_QR_CODE = "REMOVE_QR_CODE",

}

interface RemoveQrCodeFields {
    type: AppActionTypes.REMOVE_QR_CODE,
    payload: QrCodeFields
}

interface AddQrCodeFields {
    type: AppActionTypes.ADD_QR_CODE,
    payload: QrCodeFields
}

interface SetSelectedAssetsAction {
    type: AppActionTypes.SET_SELECTED_ASSETS,
    payload: TAsset[] | null
}

interface SetStoreBalanceAction {
    type: AppActionTypes.SET_STORE_BALANCE,
    payload: StoreBalance
}

interface SetIsAuthAction {
    type: AppActionTypes.SET_IS_AUTH
    payload: boolean
}

interface SetSelectedAssetAction {
    type: AppActionTypes.SET_SELECTED_ASSET
    payload: TAsset
}

interface SetStoreGroupRootAction {
    type: AppActionTypes.SET_STORE_GROUP_ROOT
    payload: ExtendedItem
}

interface SetCatalogRootAction {
    type: AppActionTypes.SET_NOMENCLATURE_ROOT
    payload: ExtendedItem
}

interface SetAssetQRCodeAction {
    type: AppActionTypes.SET_ASSET_QRCODE,
    payload: AssetQrCode
}


interface SetCurrentExtendedItemAction {
    type: AppActionTypes.SET_SELECTED_NOMENCLATURE_ITEM
    payload: ExtendedItem
}

interface SetSelectedNomenclatureGroupAction {
    type: AppActionTypes.SET_SELECTED_NOMENCLATURE_GROUP
    payload: ExtendedItem
}

interface SetSelectedStoreGroupAction {
    type: AppActionTypes.SET_SELECTED_STORE_GROUP
    payload: ExtendedItem
}

interface SetSelectedAssetStoreAction {
    type: AppActionTypes.SET_SELECTED_ASSET_STORE
    payload: ExtendedItem
}

export type AppActions = SetSelectedNomenclatureGroupAction
    | SetCatalogRootAction
    | SetCurrentExtendedItemAction
    | SetSelectedAssetStoreAction
    | SetAssetQRCodeAction
    | SetStoreGroupRootAction
    | SetSelectedStoreGroupAction
    | SetSelectedAssetAction
    | SetIsAuthAction
    | SetStoreBalanceAction
    | SetSelectedAssetsAction
    | AddQrCodeFields
    | RemoveQrCodeFields