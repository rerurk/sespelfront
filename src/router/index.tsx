import React from "react";
import Main from "../pages/main/Main";

import Nomenclatures from "../pages/nomenclatures/Nomenclatures";
import AssetStores from "../pages/assetStores/AssetStores";
import QrScan from "../components/qrscan/QrScan";
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
import BarcodeScanner from "../components/barcodeScanner/BarcodeScanner";
import ScanAssetQrCode from "../pages/scanAssetQrCode/ScanAssetQrCode";
import ScanAssetBarCode from "../pages/scanAssetBarCode/ScanAssetBarCode";

export type RouteNode = {
    isHide: boolean
    path: string,
    name: string,
    element: JSX.Element
    img?:string
}

export enum RouterTexts {
    MAIN = "Главная",
    CREATE_ASSET = "Создать ТМЦ",
    MOVE_ASSET = "Перемещение",
    NOMENCLATURE = "Номенклатура",
    ASSERTS_STORAGE = "Места хранения",
    QR_CODE_SCANNER = "Сканер",
    BARCODE_SCANNER="Сканер штрих",
    STORE_BALANCE = "складской остаток"


}

export enum RouterPath {
    MAIN = "/",
    SHOW_CATALOG_ITEM = "/SHOW_CATALOG_ITEM",
    NOMENCLATURE = "/NOMENCLATURE",
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
    BARCODE_SCANNER="/BARCODE_SCANNER",
    STORE_BALANCE = "/STORE_BALANCE"
}

export const pcRoutes: RouteNode[] = [
    {
        isHide: false,
        path: RouterPath.QR_CODE_SCANNER,
        name: RouterTexts.QR_CODE_SCANNER,
        element: <ScanAssetQrCode/>
    },
    {
        isHide: false,
        path: RouterPath.BARCODE_SCANNER,
        name: RouterTexts.BARCODE_SCANNER,
        element: <ScanAssetBarCode/>
    },
    {
        isHide: false,

        path: RouterPath.CREATE_ASSET,
        name: RouterTexts.CREATE_ASSET,
        element: <MakeAsset/>
    },
    {
        isHide: false,

        path: RouterPath.ASSETS_STORAGE,
        name: RouterTexts.ASSERTS_STORAGE,
        element: <AssetStores/>
    },
    {
        isHide: false,

        path: RouterPath.NOMENCLATURE,
        name: RouterTexts.NOMENCLATURE,
        element: <Nomenclatures/>
    },
    {
        isHide: true,
        path: RouterPath.MAIN,
        name: RouterTexts.MAIN,
        element: <ScanAssetQrCode/>
    },
    {
        isHide: true,

        path: RouterPath.MAKE_NOMENCLATURE_GROUP,
        name: "",
        element: <MakeNomenclatureGroup/>
    },
    {
        isHide: true,

        path: RouterPath.MAKE_NOMENCLATURE_ITEM_PAGE,
        name: "",
        element: <MakeNomenclatureItem/>
    },
    {
        isHide: true,

        path: RouterPath.MODIFY_NOMENCLATURE_GROUP,
        name: "",
        element: <ModifyNomenclatureGroup/>
    },
    {
        isHide: true,

        path: RouterPath.MODIFY_STORE_GROPE,
        name: "",
        element: <ModifyStoreGrope/>
    },
    {
        isHide: true,

        path: RouterPath.CREATE_STORE_GROPE,
        name: "",
        element: <CreateStoreGrope/>
    },
    {
        isHide: true,

        path: RouterPath.CREATE_ASSETS_STORE,
        name: "",
        element: <CreateAssetsStore/>
    },
    {
        isHide: true,

        path: RouterPath.QR_SCAN_RESULT,
        name: "",
        element: <QrScanResult/>
    },
    {
        isHide: false,

        path: RouterPath.STORE_BALANCE,
        name: RouterTexts.STORE_BALANCE,
        element: <StoreBalanceView/>
    },

]

export const mobileRoutes: RouteNode[] = [
    {
        isHide: false,
        path: RouterPath.QR_CODE_SCANNER,
        name: RouterTexts.QR_CODE_SCANNER,
        element: <ScanAssetQrCode/>,
        img:Domen+"/images/qrScanner.png"
    },
    {
        isHide: false,
        path: RouterPath.BARCODE_SCANNER,
        name: RouterTexts.BARCODE_SCANNER,
        element: <ScanAssetBarCode/>,
        img:Domen+"/images/qrScanner.png"
    },
    {
        isHide: true,
        path: RouterPath.CREATE_ASSET,
        name: RouterTexts.CREATE_ASSET,
        element: <MakeAsset/>
    },
    {
        isHide: true,
        path: RouterPath.ASSETS_STORAGE,
        name: RouterTexts.ASSERTS_STORAGE,
        element: <AssetStores/>
    },
    {
        isHide: true,
        path: RouterPath.NOMENCLATURE,
        name: RouterTexts.NOMENCLATURE,
        element: <Nomenclatures/>
    },
    {
        isHide: true,

        path: RouterPath.MAIN,
        name: RouterTexts.MAIN,
        element:<ScanAssetQrCode/>
    },
    {
        isHide: true,

        path: RouterPath.MAKE_NOMENCLATURE_GROUP,
        name: "",
        element: <MakeNomenclatureGroup/>
    },
    {
        isHide: true,

        path: RouterPath.MAKE_NOMENCLATURE_ITEM_PAGE,
        name: "",
        element: <MakeNomenclatureItem/>
    },
    {
        isHide: true,

        path: RouterPath.MODIFY_NOMENCLATURE_GROUP,
        name: "",
        element: <ModifyNomenclatureGroup/>
    },
    {
        isHide: true,

        path: RouterPath.MODIFY_STORE_GROPE,
        name: "",
        element: <ModifyStoreGrope/>
    },
    {
        isHide: true,

        path: RouterPath.CREATE_STORE_GROPE,
        name: "",
        element: <CreateStoreGrope/>
    },
    {
        isHide: true,

        path: RouterPath.CREATE_ASSETS_STORE,
        name: "",
        element: <CreateAssetsStore/>
    },
    {
        isHide: true,
        path: RouterPath.QR_SCAN_RESULT,
        name: "",
        element: <QrScanResult/>
    },
    {
        isHide: false,

        path: RouterPath.STORE_BALANCE,
        name: RouterTexts.STORE_BALANCE,
        element: <StoreBalanceView/>,
        img:Domen+"/images/store.png"
    },

]

export let pubicRoutes: RouteNode[] = []

export function SelectRotes() {

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        .test(navigator.userAgent)) {
        pubicRoutes = mobileRoutes

    } else {

        pubicRoutes = pcRoutes
    }


}

