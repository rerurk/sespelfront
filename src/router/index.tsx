import React from "react";
import Main from "../pages/main/Main";
import ShowAllAssetsByCatalogName from "../pages/showAllAssetsByCatalogName/ShowAllAssetsByCatalogName";
import Nomenclatures from "../pages/nomenclatures/Nomenclatures";
import ShowAssetsStores from "../pages/showAssetsStores/ShowAssetsStores";
import QrScan from "../pages/qrscan/QrScan";
import CreateAsset from "../pages/createAsset/CreateAsset";





export type RouteNode = {
    isHide: boolean
    exact: boolean,
    path: string,
    name: string,
    element: JSX.Element
}


export enum RouterTexts {
    MAIN = "Главная",
    CREATE_ASSET = "Создать ТМЦ",
    MOVE_ASSET = "Перемещение",
    NOMENCLATURE = "Номенклатура",
    ASSERTS_STORAGE = "Склады",
    QR_CODE_SCANNER = "Сканер",



}

export enum RouterPath {
    MAIN = "/",
    SHOW_CATALOG_ITEM = "/SHOW_CATALOG_ITEM",
    NOMENCLATURE = "/NOMENCLATURE",
    CREATE_ASSET = "/CREATE_ASSET",
    ASSERTS_STORAGE = "/ASSERTS_STORAGE",
    QR_CODE_SCANNER = "/QR_CODE_SCANNER",
    ALL_ASSETS_BY_CATALOG_NAME="/ALL_ASSETS_BY_CATALOG_NAME"
}

export const privateRoutes = []

export const publicRoutes: RouteNode[] = [
    {
        isHide: false,
        exact: false,
        path: RouterPath.QR_CODE_SCANNER,
        name: RouterTexts.QR_CODE_SCANNER,
        element: <QrScan/>
    },


    {
        isHide: false,
        exact: false,
        path: RouterPath.CREATE_ASSET,
        name: RouterTexts.CREATE_ASSET,
        element: <CreateAsset/>
    },
    {
        isHide: false,
        exact: false,
        path: RouterPath.ASSERTS_STORAGE,
        name: RouterTexts.ASSERTS_STORAGE,
        element: <ShowAssetsStores/>
    },
    {
        isHide: false,
        exact: false,
        path: RouterPath.NOMENCLATURE,
        name: RouterTexts.NOMENCLATURE,
        element: <Nomenclatures/>
    },
    {
        isHide: false,
        exact: false,
        path: RouterPath.MAIN,
        name: RouterTexts.MAIN,
        element: <Main/>
    },
    {
        isHide: true,
        exact: false,
        path: RouterPath.ALL_ASSETS_BY_CATALOG_NAME,
        name: "",
        element: <ShowAllAssetsByCatalogName/>
    },







]

