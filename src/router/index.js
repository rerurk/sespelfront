
import React from "react";
import Main from "../pages/main/Main";
import CreateAsset from "../pages/createasset/CreateAsset";
import MoveAsset from "../pages/moveAsset/MoveAsset";


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
        element:<CreateAsset/>
    },
    {
        exact:false,
        path: '/moveAsset',
        element:<MoveAsset/>
    }


]

