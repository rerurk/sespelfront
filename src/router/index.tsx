
import React from "react";
import Main from "../pages/main/Main";
import CreateAsset from "../pages/createasset/CreateAsset";
import MoveAsset from "../pages/moveAsset/MoveAsset";
import SetCatalog from "../pages/setCatalog/SetCatalog";
import {RouterTexts} from "../texts/Texts";

export type RouteNode={
    exact:boolean,
    path: string,
    name:string,
    element:JSX.Element
}

export const privateRoutes = [

]

export const publicRoutes:RouteNode[] = [
    {
        exact:false,
        path: '/',
        name:RouterTexts.MAIN,
        element:<Main/>
    },
    {
        exact:false,
        path: '/addAsset',
        name:RouterTexts.CREATE_ASSET,
        element:<CreateAsset/>
    },
    {
        exact:false,
        path: '/moveAsset',
        name:RouterTexts.MOVE_ASSET,
        element:<MoveAsset/>
    },
    {
        exact:false,
        path: '/setCatalog/',
        name:RouterTexts.SET_CATALOG,
        element:<SetCatalog/>
    }


]

