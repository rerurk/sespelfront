import {NomenclatureItem, Item} from "../../structs/nomenclature";
import {Dispatch} from "redux";
import {AppActionTypes, CatalogActions} from "../types/AppStoreTypes";
import {StoreAssets} from "../../structs/StoreAssets";
import {AssetAndStore, AssetQrCode} from "../../structs/Asset";

export const SetCurrentNomenclatureItemState = (catalogItem: NomenclatureItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_NOMENCLATURE_ITEM, payload: catalogItem})
    }
}

export const SetCurrentCatalogState = (catalogItem: NomenclatureItem) => {
    return (dispatch: Dispatch<CatalogActions>) => {
        dispatch({type: AppActionTypes.SET_CURRENT_CATALOG, payload: catalogItem})
    }
}

export const SetNomenclatureRootState = (root: NomenclatureItem) => {
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