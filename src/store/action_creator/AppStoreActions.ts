
import {Dispatch} from "redux";
import {AppActions, AppActionTypes} from "../types/AppStoreTypes";

import {AssetQrCode, QrCodeFields, TAsset} from "../../structs/Asset";
import {ExtendedItem} from "../../structs/App";
import {StoreBalance} from "../../structs/storesTypes";


export const AddQrCodeToState = (qrFields: QrCodeFields) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.ADD_QR_CODE, payload: qrFields})
    }
}

export const RemoveQrCodeFromState = (qrFields: QrCodeFields) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.REMOVE_QR_CODE, payload: qrFields})
    }
}

export const SetSelectedAssetsState = (assets: TAsset[]) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_ASSETS, payload: assets})
    }
}

export const SetNomenclatureRootState = (root: ExtendedItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_NOMENCLATURE_ROOT, payload: root})
    }
}

export const SetStoreGroupRoot=(root:ExtendedItem)=>{
    return (dispatch:Dispatch<AppActions>)=>{dispatch({type:AppActionTypes.SET_STORE_GROUP_ROOT,payload:root})}
}

export const  SetSelectedNomenclatureItemState = (catalogItem: ExtendedItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_NOMENCLATURE_ITEM, payload: catalogItem})
    }
}

export const SetSelectedNomenclatureGroupState = (catalogItem: ExtendedItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_NOMENCLATURE_GROUP, payload: catalogItem})
    }
}

export const SetSelectedStoreGroupState = (storeGroupItem: ExtendedItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_STORE_GROUP, payload: storeGroupItem})
    }
}

export const SetSelectedAssetsStoreState = (store: ExtendedItem) => {
    return (dispatch: Dispatch<AppActions>) => {
        dispatch({type: AppActionTypes.SET_SELECTED_ASSET_STORE, payload: store})
    }
}

export const SetSelectedAssetState=(asset:TAsset)=>{
    return(dispatch:Dispatch<AppActions>)=>{
        dispatch({type:AppActionTypes.SET_SELECTED_ASSET,payload:asset})
    }
}


export const SetAssetQRCode=(assetQrCode:AssetQrCode)=>{
    return(dispatch:Dispatch<AppActions>)=>{
        dispatch({type:AppActionTypes.SET_ASSET_QRCODE,payload:assetQrCode})
    }
}

export const SetIsAuthState=(auth:boolean)=>{
    return(dispatch:Dispatch<AppActions>)=>{
        dispatch({type:AppActionTypes.SET_IS_AUTH,payload:auth})
    }
}
export const SetStoreBalanceState=(storeBalance:StoreBalance)=>{
    return(dispatch:Dispatch<AppActions>)=>{
        dispatch({type:AppActionTypes.SET_STORE_BALANCE,payload:storeBalance})
    }
}