import React, {FC} from 'react';

// @ts-ignore
import cl from "./SearchAsset.module.css"
import {RouteNode, RouterMap} from "../../router";
import RouteBt from "../../router/routesView/RouteBT";

const SearchAsset: FC = () => {
    let sQr: RouteNode = RouterMap.SCAN_ASSET_QRCODE
    let sBcode: RouteNode = RouterMap.SCAN_ASSET_BAR_CODE
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_scanners}>
                <div className={cl.wrapper_scanner}>
                    <RouteBt node={sQr}/>
                </div>
                <div className={cl.wrapper_scanner}>
                    <RouteBt node={sBcode}/>
                </div>
            </div>
        </div>
    );
};

export default SearchAsset;