import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./CatalogTree.module.css"

import AssetView from "../assetView/AssetView";
import {Asset} from "../../structs/Asset";
import {Fetches} from "../../fetches/Fetches";



const CatalogTree: FC = () => {
    const [mainAsset,setMainAsset]=useState<Asset|null>(null)
    console.log(mainAsset)
    useEffect(()=>{
        Fetches.GetMainAsset().then(r=>
            setMainAsset(r)
        )

    },[])


    return (
        <div>{
        mainAsset
        ?<AssetView asset={mainAsset} keyVal={1}/>
        :false
        }
        </div>
    );
};

export default CatalogTree;