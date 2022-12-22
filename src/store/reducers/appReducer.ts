import {NomenclatureItem} from "../../structs/nomenclature";
import {AppActions, AppActionTypes, AppState} from "../types/AppStoreTypes";
import {StoreAssets, StoreItem} from "../../structs/StoreAssets";
import {AssetAndStore, AssetQrCode} from "../../structs/Asset";



const initialState: AppState = {
    nomenclatureRoot: null,
    storeGroupRoot: null,
    selectedNomenclatureGroup: null,
    currCatalogItem: null,
    currentStore: null,
    currentAssetAndStore: null,
    assetQrCode: null


}

export function GetCurrentState(): AppState {
    return initialState
}

function setStoreGroupRootItem(root: StoreItem): AppState {

    initialState.storeGroupRoot = root
    return initialState
}

function setAssetQrCode(assetQrCode: AssetQrCode): AppState {
    initialState.assetQrCode = assetQrCode
    return initialState
}

function setCurrentCatalogItem(catalogItem: NomenclatureItem): AppState {

    initialState.currCatalogItem = catalogItem
    return initialState
}

function setCurrentNomenclatureGroup(selectedNomenclatureGroup: NomenclatureItem): AppState {


    initialState.selectedNomenclatureGroup = selectedNomenclatureGroup
    return initialState
}

function setCatalogRoot(root: NomenclatureItem): AppState {

    initialState.nomenclatureRoot = root
    return initialState
}

function setCurrentAssetStore(currStore: StoreAssets): AppState {
    console.log(currStore)
    initialState.currentStore = currStore
    return initialState
}

function setCurrentAssetAndStore(assetAndStore: AssetAndStore): AppState {
    initialState.currentAssetAndStore = assetAndStore
    return initialState
}

export const appReducer = (state = initialState, action: AppActions): AppState => {

    switch (action.type) {
        case AppActionTypes.SET_SELECTED_NOMENCLATURE_GROUP:
            return {...setCurrentNomenclatureGroup(action.payload)}
        case AppActionTypes.SET_CATALOG_ROOT:
            return {...setCatalogRoot(action.payload)}
        case AppActionTypes.SET_CURRENT_NOMENCLATURE_ITEM:
            return {...setCurrentCatalogItem(action.payload)}
        case AppActionTypes.SET_CURRENT_ASSET_STORE:
            return {...setCurrentAssetStore(action.payload)}
        case AppActionTypes.SET_CURRENT_ASSET:
            return {...setCurrentAssetAndStore(action.payload)}
        case AppActionTypes.SET_ASSET_QRCODE:
            return {...setAssetQrCode(action.payload)}
        case AppActionTypes.SET_STORE_GROUP_ROOT:
            return {...setStoreGroupRootItem(action.payload)}

        default:
            return state
    }
}