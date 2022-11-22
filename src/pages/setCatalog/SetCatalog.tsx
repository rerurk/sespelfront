import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
// @ts-ignore
import cl from "./SetCatalog.module.css"
import {Fetches} from "../../fetches/Fetches";
import {CatalogNode} from "../../structs/catalog";
import CatalogTree from "../../components/catalogTree/CatalogTree";
const SetCatalog:FC = () => {
    const [catalog,setCatalog]=useState<CatalogNode>({
        name:"",
        nodes:[]
    })
    useEffect(()=>{

        Fetches.GetCatalogNode("").then(r=> {
            setCatalog(r)
        })
    },[])

    return (
        <div className={cl.wrapper}>
           <CatalogTree catalogNode={catalog}/>
        </div>
    );
};

export default SetCatalog;