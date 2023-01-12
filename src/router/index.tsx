import React from "react";


import Nomenclatures from "../pages/nomenclatures/Nomenclatures";
import AssetStores from "../pages/assetStores/AssetStores";

import MakeAsset from "../pages/makeAsset/MakeAsset";
import MakeNomenclatureGroup from "../pages/makeNomenclatureGroup/MakeNomenclatureGroup";
import MakeNomenclatureItem from "../pages/makeNomenclatureItem/MakeNomenclatureItem";
import ModifyNomenclatureGroup from "../pages/modifyNomenclatureGroup/ModifyNomenclatureGroup";
import CreateStoreGrope from "../pages/createStoreGrope/CreateStoreGrope";
import CreateAssetsStore from "../pages/createAssetsStore/CreateAssetsStore";
import ModifyStoreGrope from "../pages/modifyStoreGrope/ModifyStoreGrope";
import QrScanResult from "../pages/qrScanResult/QrScanResult";
import StoreBalanceView from "../pages/storeBalanceView/StoreBalanceView";
import {Domen} from "../fetches/Requests";

import ScanAssetQrCode from "../pages/scanAssetQrCode/ScanAssetQrCode";
import ScanAssetBarCode from "../pages/scanAssetBarCode/ScanAssetBarCode";
import SearchAsset from "../pages/searchAsset/SearchAsset";

export enum RouterPath {
    MAIN = "/",
    SHOW_CATALOG_ITEM = "/SHOW_CATALOG_ITEM",
    NOMENCLATURE = "/NOMENCLATURE",
    SEARCH_ASSET = "/SEARCH_ASSET",
    CREATE_ASSET = "/CREATE_ASSET",
    ASSETS_STORAGE = "/ASSETS_STORAGE",
    QR_CODE_SCANNER = "/QR_CODE_SCANNER",
    MAKE_NOMENCLATURE_GROUP = "/MAKE_NOMENCLATURE_GROUP",
    MAKE_NOMENCLATURE_ITEM_PAGE = "/MAKE_NOMENCLATURE_ITEM_PAGE",
    MODIFY_NOMENCLATURE_GROUP = "/MODIFY_NOMENCLATURE_GROUP",
    MODIFY_STORE_GROPE = "/MODIFY_STORE_GROPE",
    CREATE_STORE_GROPE = "/CREATE_STORE_GROPE",
    CREATE_ASSETS_STORE = "/CREATE_ASSETS_STORE",
    QR_SCAN_RESULT = "/QR_SCAN_RESULT",
    BARCODE_SCANNER = "/BARCODE_SCANNER",
    STORE_BALANCE = "/STORE_BALANCE"
}

export type RouteNode = {
    isHide: boolean
    path: string,
    name: string,
    element: JSX.Element
    img?: string
}

export enum RouterTexts {
    MAIN = "Главная",
    SEARCH_ASSET = "Поиск ТМЦ",
    CREATE_ASSET = "Создать ТМЦ",
    MOVE_ASSET = "Перемещение",
    NOMENCLATURE = "Номенклатура",
    ASSERTS_STORAGE = "Места хранения",
    QR_CODE_SCANNER = "Сканер",
    BARCODE_SCANNER = "Сканер штрих",
    STORE_BALANCE = "складской остаток"


}

export type TRouterMap = {
    MAIN: RouteNode,
    NOMENCLATURE: RouteNode,
    SEARCH_ASSET: RouteNode,
    CREATE_ASSET: RouteNode,
    ASSETS_STORAGE: RouteNode,
    SCAN_ASSET_QRCODE: RouteNode,
    MAKE_NOMENCLATURE_GROUP: RouteNode,
    MAKE_NOMENCLATURE_ITEM_PAGE: RouteNode,
    MODIFY_NOMENCLATURE_GROUP: RouteNode,
    MODIFY_STORE_GROPE: RouteNode,
    CREATE_STORE_GROPE: RouteNode,
    CREATE_ASSETS_STORE: RouteNode,
    QR_SCAN_RESULT: RouteNode,
    SCAN_ASSET_BAR_CODE: RouteNode,
    STORE_BALANCE: RouteNode,
}

export const RouterMap: TRouterMap = {
    MAIN:  {
        isHide: false,
        path: RouterPath.MAIN,
        name: RouterTexts.SEARCH_ASSET,
        element: <SearchAsset/>,
        img: Domen + "/images/search.png"
    },
    SEARCH_ASSET:  {
        isHide: true,
        path: RouterPath.SEARCH_ASSET,
        name: RouterTexts.SEARCH_ASSET,
        element: <SearchAsset/>,
        img: Domen + "/images/search.png"
    },
    ASSETS_STORAGE: {
        isHide: false,
        path: RouterPath.ASSETS_STORAGE,
        name: RouterTexts.ASSERTS_STORAGE,
        element: <AssetStores/>
    },
    SCAN_ASSET_BAR_CODE: {
        isHide: true,
        path: RouterPath.BARCODE_SCANNER,
        name: RouterTexts.BARCODE_SCANNER,
        element: <ScanAssetBarCode/>
    },
    CREATE_ASSET: {
        isHide: false,
        path: RouterPath.CREATE_ASSET,
        name: RouterTexts.CREATE_ASSET,
        element: <MakeAsset/>
    },
    CREATE_ASSETS_STORE: {
        isHide: true,

        path: RouterPath.CREATE_ASSETS_STORE,
        name: "",
        element: <CreateAssetsStore/>
    },
    CREATE_STORE_GROPE: {
        isHide: true,

        path: RouterPath.CREATE_STORE_GROPE,
        name: "",
        element: <CreateStoreGrope/>
    },

    MAKE_NOMENCLATURE_GROUP: {
        isHide: true,
        path: RouterPath.MAKE_NOMENCLATURE_GROUP,
        name: "",
        element: <MakeNomenclatureGroup/>
    },
    MAKE_NOMENCLATURE_ITEM_PAGE: {
        isHide: true,
        path: RouterPath.MAKE_NOMENCLATURE_ITEM_PAGE,
        name: "",
        element: <MakeNomenclatureItem/>
    },
    MODIFY_NOMENCLATURE_GROUP: {
        isHide: true,

        path: RouterPath.MODIFY_NOMENCLATURE_GROUP,
        name: "",
        element: <ModifyNomenclatureGroup/>
    },
    MODIFY_STORE_GROPE: {
        isHide: true,

        path: RouterPath.MODIFY_STORE_GROPE,
        name: "",
        element: <ModifyStoreGrope/>
    },
    NOMENCLATURE: {
        isHide: false,

        path: RouterPath.NOMENCLATURE,
        name: RouterTexts.NOMENCLATURE,
        element: <Nomenclatures/>
    },
    SCAN_ASSET_QRCODE: {
        isHide: true,
        path: RouterPath.QR_CODE_SCANNER,
        name: RouterTexts.QR_CODE_SCANNER,
        element: <ScanAssetQrCode/>,
        img: Domen + "/images/qrScanner.png"
    },
    QR_SCAN_RESULT: {
        isHide: true,

        path: RouterPath.QR_SCAN_RESULT,
        name: "",
        element: <QrScanResult/>
    },
    STORE_BALANCE: {
        isHide: false,

        path: RouterPath.STORE_BALANCE,
        name: RouterTexts.STORE_BALANCE,
        element: <StoreBalanceView/>,
        img: Domen + "/images/store.png"
    },

}
