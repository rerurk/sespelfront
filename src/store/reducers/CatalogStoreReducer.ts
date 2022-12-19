import {NomenclatureItem, Item} from "../../structs/nomenclature";
import {CatalogActions, AppActionTypes, AppState} from "../types/AppStoreTypes";
import {StoreAssets} from "../../structs/StoreAssets";
import {AssetAndStore, AssetQrCode} from "../../structs/Asset";


const initialState: AppState = {
    nomenclatureRoot: null,
    currentCatalog: null,
    currCatalogItem: null,
    currentStore: null,
    currentAssetAndStore:null,
    assetQrCode:null


}

export function GetCurrentState(): AppState {
    return initialState
}

function setAssetQrCode(assetQrCode:AssetQrCode):AppState {
    initialState.assetQrCode=assetQrCode
return initialState
}

function setCurrentCatalogItem(catalogItem: NomenclatureItem): AppState {

    initialState.currCatalogItem = catalogItem
    return initialState
}

function setCurrentCatalog(catalogItem: NomenclatureItem): AppState {
    console.log("Store State catalogItem:", catalogItem)

    initialState.currentCatalog = catalogItem
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

function setCurrentAssetAndStore(assetAndStore:AssetAndStore): AppState{
    initialState.currentAssetAndStore=assetAndStore
    return initialState
}

export const showCatalogNodeReducer = (state = initialState, action: CatalogActions): AppState => {

    switch (action.type) {
        case AppActionTypes.SET_CURRENT_CATALOG:
            return {...setCurrentCatalog(action.payload)}
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

        default:
            return state
    }
}