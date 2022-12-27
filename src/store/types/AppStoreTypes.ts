
import {AssetQrCode, TAsset} from "../../structs/Asset";
import {ExtendedItem} from "../../structs/App";


export type AppState = {

    nomenclatureRoot: ExtendedItem | null//корень каталога, его получаемс сервера
    storeGroupRoot: ExtendedItem | null
    selectedNomenclatureItem: ExtendedItem | null//
    selectedNomenclatureGroup: ExtendedItem | null// текущий выбранный каталог для отобрадения
    selectedStoreGroup: ExtendedItem | null// текущий выбранный каталог для отобрадения
    selectedStore: ExtendedItem | null// текущий отоброаемый склад
    selectedAsset:TAsset|null

}

export enum AppActionTypes {

    SET_NOMENCLATURE_ROOT = 'SET_NOMENCLATURE_ROOT',
    SET_STORE_GROUP_ROOT = "SET_STORE_GROUP_ROOT",
    SET_SELECTED_NOMENCLATURE_GROUP = "SET_SELECTED_NOMENCLATURE_GROUP",
    SET_SELECTED_STORE_GROUP = "SET_SELECTED_STORE_GROUP",
    SET_SELECTED_NOMENCLATURE_ITEM = "SET_SELECTED_NOMENCLATURE_ITEM",
    SET_SELECTED_ASSET_STORE = "SET_SELECTED_ASSET_STORE",
    SET_SELECTED_ASSET = "SET_SELECTED_ASSET",
    SET_ASSET_QRCODE = "SET_ASSET_QRCODE"

}

interface SetSelectedAssetAction {
    type:AppActionTypes.SET_SELECTED_ASSET
    payload:TAsset
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
     |SetSelectedAssetAction