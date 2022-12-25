import React from "react";
import Main from "../pages/main/Main";

import Nomenclatures from "../pages/nomenclatures/Nomenclatures";
import AssetStores from "../pages/assetStores/AssetStores";
import QrScan from "../pages/qrscan/QrScan";
import CreateAsset from "../pages/createAsset/CreateAsset";
import MakeNomenclatureGroup from "../pages/makeNomenclatureGroup/MakeNomenclatureGroup";
import MakeNomenclatureItem from "../pages/makeNomenclatureItem/MakeNomenclatureItem";
import ModifyNomenclatureGroup from "../pages/modifyNomenclatureGroup/ModifyNomenclatureGroup";
import CreateStoreGrope from "../pages/createStoreGrope/CreateStoreGrope";
import CreateAssetsStore from "../pages/createAssetsStore/CreateAssetsStore";
import ModifyStoreGrope from "../pages/modifyStoreGrope/ModifyStoreGrope";

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
    ASSERTS_STORAGE = "Места хранения",
    QR_CODE_SCANNER = "Сканер",


}

export enum RouterPath {
    MAIN = "/",
    SHOW_CATALOG_ITEM = "/SHOW_CATALOG_ITEM",
    NOMENCLATURE = "/NOMENCLATURE",
    CREATE_ASSET = "/CREATE_ASSET",
    ASSETS_STORAGE = "/ASSETS_STORAGE",

    QR_CODE_SCANNER = "/QR_CODE_SCANNER",
    MAKE_NOMENCLATURE_GROUP = "/MAKE_NOMENCLATURE_GROUP",
    MAKE_NOMENCLATURE_ITEM = "/MAKE_NOMENCLATURE_ITEM",
    MODIFY_NOMENCLATURE_GROUP = "/MODIFY_NOMENCLATURE_GROUP",
    MODIFY_STORE_GROPE="/MODIFY_STORE_GROPE",
    CREATE_STORE_GROPE = "/CREATE_STORE_GROPE",
    CREATE_ASSETS_STORE="/CREATE_ASSETS_STORE"
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
        path: RouterPath.ASSETS_STORAGE,
        name: RouterTexts.ASSERTS_STORAGE,
        element: <AssetStores/>
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
        path: RouterPath.MAKE_NOMENCLATURE_GROUP,
        name: "",
        element: <MakeNomenclatureGroup/>
    },
    {
        isHide: true,
        exact: false,
        path: RouterPath.MAKE_NOMENCLATURE_ITEM,
        name: "",
        element: <MakeNomenclatureItem/>
    },
    {
        isHide: true,
        exact: false,
        path: RouterPath.MODIFY_NOMENCLATURE_GROUP,
        name: "",
        element: <ModifyNomenclatureGroup/>
    },
    {
        isHide: true,
        exact: false,
        path: RouterPath.MODIFY_STORE_GROPE,
        name: "",
        element: <ModifyStoreGrope/>
    },

    {
        isHide: true,
        exact: false,
        path: RouterPath.CREATE_STORE_GROPE,
        name: "",
        element: <CreateStoreGrope/>
    },
    {
        isHide: true,
        exact: false,
        path: RouterPath.CREATE_ASSETS_STORE,
        name: "",
        element: <CreateAssetsStore/>
    },


]

