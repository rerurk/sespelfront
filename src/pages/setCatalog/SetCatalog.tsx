import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
// @ts-ignore
import cl from "./SetCatalog.module.css"
import {Fetches} from "../../fetches/Fetches";
import {CatalogNode} from "../../structs/catalog";
import CatalogTree from "../../components/catalogTree/CatalogTree";

const SetCatalog: FC = () => {
    const [catalog, setCatalog] = useState<CatalogNode>({
        name: "",
        his_id: "",
        parent_id: "",
        nodes: []
    })
    useEffect(() => {
        let rCatalog: CatalogNode
        Fetches.GetCatalogNode("").then(r => {

            rCatalog = r

            if (!rCatalog.his_id) {
                setCatalog(()=>({...catalog,name:"НЕТ НИРЧЕ"}))
            }
            setCatalog(rCatalog)
            


        })
    }, [])

    return (
        <div className={cl.wrapper}>
            <CatalogTree catalogNode={catalog}/>
        </div>
    );
};

export default SetCatalog;