import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./TreeRoot.module.css"
import TreeNode from "./TreeNode";
import {Fetches} from "../../fetches/Fetches";

import {SetCatalogRootState, SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {CatalogItem} from "../../structs/catalog";



const TreeRoot: FC = () => {
    const [treeRoot,setTreeRoot]=useState<CatalogItem|null>(null)
    const {catalogRoot} = useTypeSelector(state => state.showCatalogNode)
    const dispatch=useDispatch()
    useEffect(()=>{
        Fetches.GetMainCatalogItem()
            .then(r=>{
                if(!(r instanceof Error)){
                    if(!catalogRoot) {
                        // @ts-ignore
                        dispatch(SetCatalogRootState(r))
                        // @ts-ignore
                        dispatch(SetCurrentCatalogState({item:r,items:null}))

                    }
                    setTreeRoot(r)

                }
            })
    },[catalogRoot])

    return (
        <div className={cl.wrapper}>{
            (catalogRoot)
                ? <TreeNode item={catalogRoot} key={"TreeNode"+catalogRoot.ref} />
                : false
        }
        </div>
    );
};

export default TreeRoot;