import React from "react";
import Main from "../pages/main/Main";
import AssetsView from "../pages/assetsView/AssetsView";
import SetCatalog from "../pages/setCatalog/SetCatalog";
import AssetsStoresPage from "../pages/assetsStorePage/AssetsStoresPage";
import QrScan from "../pages/qrscan/QrScan";




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
    SET_CATALOG = "Каталог",
    ASSERTS_STORAGE = "Склады",
    QR_CODE_SCANNER = "Сканер"


}

export enum RouterPath {
    MAIN = "/",
    SHOW_CATALOG_ITEM = "/SHOW_CATALOG_ITEM",
    CATALOG_SETUP = "/CATALOG_SETUP",
    CREATE_ASSET = "/CREATE_ASSET",
    ASSERTS_STORAGE = "/ASSERTS_STORAGE",
    QR_CODE_SCANNER = "/ QR_CODE_SCANNER"
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
        path: RouterPath.ASSERTS_STORAGE,
        name: RouterTexts.ASSERTS_STORAGE,
        element: <AssetsStoresPage/>
    },
    {
        isHide: false,
        exact: false,
        path: RouterPath.CATALOG_SETUP,
        name: RouterTexts.SET_CATALOG,
        element: <SetCatalog/>
    },
    {
        isHide: false,
        exact: false,
        path: RouterPath.MAIN,
        name: RouterTexts.MAIN,
        element: <Main/>
    },
    {
        isHide: false,
        exact: false,
        path: '/CREATE_ASSET',
        name: RouterTexts.CREATE_ASSET,
        element: <AssetsView/>
    },






]

