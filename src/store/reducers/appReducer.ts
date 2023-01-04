
import {AppActions, AppActionTypes, AppState} from "../types/AppStoreTypes";
import {TAsset} from "../../structs/Asset";
import {ExtendedItem} from "../../structs/App";


const initialState: AppState = {
    isAuth:true,
    nomenclatureRoot: null,
    storeGroupRoot: null,
    selectedNomenclatureGroup: null,
    selectedStoreGroup:null,
    selectedNomenclatureItem: null,
    selectedStore: null,
    selectedAsset:null



}

export function GetCurrentState(): AppState {
    return initialState
}

function setAuthToState(isAuth:boolean):AppState {
  initialState.isAuth=isAuth
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
        default:
            return state
    }
}