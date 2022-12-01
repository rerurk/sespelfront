
import React from "react";
import Main from "../pages/main/Main";
import CreateAsset from "../pages/createasset/CreateAsset";
import ShowCatalogItem from "../pages/showCatalogItem/ShowCatalogItem";
import SetCatalog from "../pages/setCatalog/SetCatalog";
import {RouterTexts} from "../texts/Texts";

export type RouteNode={
    isHide:boolean
    exact:boolean,
    path: string,
    name:string,
    element:JSX.Element
}

export enum RouterPath {
    MAIN="/",
    SHOW_CATALOG_ITEM="/SHOW_CATALOG_ITEM",
    CATALOG_SETUP="/CATALOG_SETUP"
}

export const privateRoutes = [

]

export const publicRoutes:RouteNode[] = [
    {
        isHide:false,
        exact:false,
        path: RouterPath.MAIN,
        name:RouterTexts.MAIN,
        element:<Main/>
    },
    {
        isHide:false,
        exact:false,
        path: '/',
        name:RouterTexts.CREATE_ASSET,
        element:<CreateAsset/>
    },
    {
        isHide:false,
        exact:false,
        path: RouterPath.SHOW_CATALOG_ITEM,
        name:RouterTexts.MOVE_ASSET,
        element:<ShowCatalogItem/>
    },
    {
        isHide:false,
        exact:false,
        path: RouterPath.CATALOG_SETUP,
        name:RouterTexts.SET_CATALOG,
        element:<SetCatalog/>
    }


]

