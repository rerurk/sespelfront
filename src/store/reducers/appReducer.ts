
import {AppActions, AppActionTypes, AppState} from "../types/AppStoreTypes";
import {QrCodeFields, TAsset} from "../../structs/Asset";
import {ExtendedItem} from "../../structs/App";
import {StoreBalance} from "../../structs/storesTypes";



const initialState: AppState = {
    isAuth:false,
    storeBalance:null,
    nomenclatureRoot: null,
    storeGroupRoot: null,
    selectedNomenclatureGroup: null,
    selectedStoreGroup:null,
    selectedNomenclatureItem: null,
    selectedStore: null,
    selectedAsset:null,
    qrCodes:null



}

export function GetCurrentState(): AppState {
    return initialState
}

export function IsQrCodeContainsInState(code:string):boolean {
    if (initialState.qrCodes) {
    return initialState.qrCodes.filter((qr:QrCodeFields)=>qr.code==code).length>0
        }
    return false

}
function removeAssetFromState (qrFields: QrCodeFields):AppState {
    if (initialState.qrCodes) {
        initialState.qrCodes = initialState.qrCodes.filter((qr:QrCodeFields)=>qr.code!=qrFields.code)
    }

    return initialState
}
function addAssetToState (qr:QrCodeFields):AppState {
    if(!initialState.qrCodes){
        initialState.qrCodes=[]
    }
    initialState.qrCodes.push(qr)

    return initialState
}

function setSelectedAssetsState(assets:TAsset[]|null):AppState {

    return initialState
}

function setAuthToState(isAuth:boolean):AppState {
  initialState.isAuth=isAuth
    return initialState
}

function setStoreBalance(storeBalance: StoreBalance|null): AppState {
    initialState.storeBalance = storeBalance
    return initialState
}
function setStoreGroupRootItem(root: ExtendedItem): AppState {

    initialState.storeGroupRoot = root
    return initialState
}

function setCurrentCatalogItem(catalogItem: ExtendedItem): AppState {

    initialState.selectedNomenclatureItem = catalogItem
    return initialState
}

function setCurrentNomenclatureGroup(selectedNomenclatureGroup: ExtendedItem): AppState {


    initialState.selectedNomenclatureGroup = selectedNomenclatureGroup
    return initialState
}

function setCurrentStoreGroup(selectedStoreGroup: ExtendedItem): AppState {

    initialState.selectedStoreGroup = selectedStoreGroup
    return initialState
}

function setCatalogRoot(root: ExtendedItem): AppState {

    initialState.nomenclatureRoot = root
    return initialState
}

function setSelectedAssetStore(currStore: ExtendedItem): AppState {

    initialState.selectedStore = currStore
    return initialState
}
function setSelectedAsset(asset:TAsset):AppState{
    initialState.selectedAsset=asset
    return initialState
}


export const appReducer = (state = initialState, action: AppActions): AppState => {

    switch (action.type) {
        case AppActionTypes.SET_SELECTED_NOMENCLATURE_GROUP:
            return {...setCurrentNomenclatureGroup(action.payload)}
        case AppActionTypes.SET_NOMENCLATURE_ROOT:
            return {...setCatalogRoot(action.payload)}
        case AppActionTypes.SET_SELECTED_NOMENCLATURE_ITEM:
            return {...setCurrentCatalogItem(action.payload)}
        case AppActionTypes.SET_SELECTED_ASSET_STORE:
            return {...setSelectedAssetStore(action.payload)}
        case AppActionTypes.SET_STORE_GROUP_ROOT:
            return {...setStoreGroupRootItem(action.payload)}
        case AppActionTypes.SET_SELECTED_STORE_GROUP:
            return {...setCurrentStoreGroup(action.payload)}
        case AppActionTypes.SET_SELECTED_ASSET:
            return {...setSelectedAsset(action.payload)}
        case AppActionTypes.SET_IS_AUTH:
            return {...setAuthToState(action.payload)}
        case AppActionTypes.SET_STORE_BALANCE:
            return {...setStoreBalance(action.payload)}
        case AppActionTypes.SET_SELECTED_ASSETS:
            return {...setSelectedAssetsState(action.payload)}
        case AppActionTypes.ADD_QR_CODE:
            return {...addAssetToState(action.payload)}
        case AppActionTypes.REMOVE_QR_CODE:
            return {...removeAssetFromState(action.payload)}
        default:
            return state
    }
}