
import React from "react";
import Main from "../pages/main/Main";
import AddAsset from "../pages/addasset/AddAsset";


export const privateRoutes = [

]

export const publicRoutes = [
    {
        exact:false,
        path: '/',
        element:<Main/>
    },
    {
        exact:false,
        path: '/addAsset',
        element:<AddAsset/>
    }


]

