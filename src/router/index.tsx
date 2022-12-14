import React from "react";
import Main from "../pages/main/Main";
import CreateAsset from "../pages/createasset/CreateAsset";
import SetCatalog from "../pages/setCatalog/SetCatalog";
import AssetsStoresPage from "../pages/assetsStorePage/AssetsStoresPage";


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
    ASSERTS_STORAGE = "Склады"


}

export enum RouterPath {
    MAIN = "/",
    SHOW_CATALOG_ITEM = "/SHOW_CATALOG_ITEM",
    CATALOG_SETUP = "/CATALOG_SETUP",
    CREATE_ASSET = "/CREATE_ASSET",
    ASSERTS_STORAGE = "/ASSERTS_STORAGE"

}

export const privateRoutes = []

export const publicRoutes: RouteNode[] = [

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
        element: <CreateAsset/>
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
        path: RouterPath.ASSERTS_STORAGE,
        name: RouterTexts.ASSERTS_STORAGE,
        element: <AssetsStoresPage/>
    }


]

