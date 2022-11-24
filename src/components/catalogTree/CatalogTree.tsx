import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./CatalogTree.module.css"
import CatalogView from "../catalogView/CatalogView";
import {Fetches} from "../../fetches/Fetches";
import {CatalogItem} from "../../structs/catalog";



const CatalogTree: FC = () => {
    const [mainAsset,setMainAsset]=useState<CatalogItem|null>(null)
    console.log(mainAsset)
    useEffect(()=>{
        Fetches.GetMainCatalogItem().then(r=> {
                console.log(r)
                setMainAsset(r)
            }
        )

    },[])


    return (
        <div className={cl.wrapper}>{
        mainAsset
        ?<CatalogView item={mainAsset} keyVal={1}/>
        :false
        }
        </div>
    );
};

export default CatalogTree;