import {NomenclatureItem} from "../../structs/nomenclature";
import {Dispatch} from "redux";
import {AppActions, AppActionTypes} from "../types/AppStoreTypes";
import {StoreItem} from "../../structs/StoreAssets";
import {AssetAndStore, AssetQrCode} from "../../structs/Asset";



export const SetNomenclatureRootState = (root: NomenclatureItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_NOMENCLATURE_ROOT, payload: root})
    }
}

export const SetStoreGroupRoot=(root:StoreItem)=>{
    return (dispatch:Dispatch<AppActions>)=>{dispatch({type:AppActionTypes.SET_STORE_GROUP_ROOT,payload:root})}
}

export const SetCurrentNomenclatureItemState = (catalogItem: NomenclatureItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_NOMENCLATURE_ITEM, payload: catalogItem})
    }
}

export const SetSelectedNomenclatureGroupState = (catalogItem: NomenclatureItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_NOMENCLATURE_GROUP, payload: catalogItem})
    }
}

export const SetSelectedStoreGroupState = (storeGroupItem: StoreItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_STORE_GROUP, payload: storeGroupItem})
    }
}

export const SetSelectedAssetsStoreState = (store: StoreItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_ASSET_STORE, payload: store})
    }
}

export const SetCurrentAsset=(assetAndStore:AssetAndStore)=>{
    return(dispatch:Dispatch<AppActions>)=>{
        dispatch({type:AppActionTypes.SET_CURRENT_ASSET,payload:assetAndStore})
    }
}

export const SetAssetQRCode=(assetQrCode:AssetQrCode)=>{
    return(dispatch:Dispatch<AppActions>)=>{
        dispatch({type:AppActionTypes.SET_ASSET_QRCODE,payload:assetQrCode})
    }
}