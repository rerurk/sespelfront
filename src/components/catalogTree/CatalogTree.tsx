import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./CatalogTree.module.css"
import CatalogView from "../catalogView/CatalogView";
import {Fetches} from "../../fetches/Fetches";
import {CatalogItem, CatalogNode} from "../../structs/catalog";
import {useDispatch} from "react-redux";
import {SetShowCatalogState} from "../../store/action_creator/showCatalogNode";



const CatalogTree: FC = () => {
    const [mainAsset, setMainAsset] = useState<CatalogItem | null>(null)
    const dispatch=useDispatch()
    useEffect(() => {
        Fetches.GetMainCatalogItem().then(item => {
               if (!(item instanceof Error)){
                   setMainAsset(item)
                   Fetches.GetCatalogItems(item).then(items=>{
                       if (!(items instanceof Error)) {
                           item.items=items
                           let catalogNode:CatalogNode={
                               parent:null,
                               self:item
                           }
                           // @ts-ignore
                           dispatch(SetShowCatalogState(catalogNode))
                       }
                   })
               }
            }

        )

    }, [])


    return (
        <div className={cl.wrapper}>{
            mainAsset
                ? <CatalogView item={mainAsset} keyVal={1} key={1} parentItem={null}/>
                : false
        }
        </div>
    );
};

export default CatalogTree;