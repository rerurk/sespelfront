import {CatalogItem, Item} from "../../structs/catalog";
import {Dispatch} from "redux";
import {AppActionTypes, CatalogActions} from "../types/CatalogStoreTypes";
import {StoreAssets} from "../../structs/StoreAssets";
import {AssetAndStore, AssetQrCode} from "../../structs/Asset";

export const SetCurrentCatalogItemState = (catalogItem: CatalogItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_CATALOG_ITEM, payload: catalogItem})
    }
}

export const SetCurrentCatalogState = (catalogItem: CatalogItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_CATALOG, payload: catalogItem})
    }
}

export const SetCatalogRootState = (root: CatalogItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CATALOG_ROOT, payload: root})
    }
}

export const SetAssetsStore = (store: StoreAssets) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_ASSET_STORE, payload: store})
    }
}

export const SetCurrentAsset=(assetAndStore:AssetAndStore)=>{
    return(dispatch:Dispatch<CatalogActions>)=>{
        dispatch({type:AppActionTypes.SET_CURRENT_ASSET,payload:assetAndStore})
    }
}

export const SetAssetQRCode=(assetQrCode:AssetQrCode)=>{
    return(dispatch:Dispatch<CatalogActions>)=>{
        dispatch({type:AppActionTypes.SET_ASSET_QRCODE,payload:assetQrCode})
    }
}