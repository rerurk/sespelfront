import React, {FC, memo, useEffect, useLayoutEffect} from 'react';
// @ts-ignore
import cl from "./TreeRoot.module.css"
import TreeNode from "./TreeNode";
import {Fetches} from "../../fetches/Fetches";

import {SetCatalogRootState, SetCurrentCatalogState} from "../../store/action_creator/CatalogStoreActions";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";
import {Tools} from "../../tools/Tools";




const TreeRoot: FC = memo(() => {


    const {catalogRoot} = useTypeSelector(state => state.showCatalogNode)
    const dispatch=useDispatch()
    useEffect(()=>{

        if(!catalogRoot) {
            Fetches.GetMainCatalogItem()
                .then(r => {
                    if (!(r instanceof Error)) {

                            // @ts-ignore
                            dispatch(SetCatalogRootState(r))
                            // @ts-ignore
                            dispatch(SetCurrentCatalogState(r))




                    }
                })
        }
    },[catalogRoot])

    return (
        <div className={cl.wrapper}>{
            (catalogRoot)
                ? <TreeNode item={catalogRoot} key={"TreeNode"+catalogRoot.ref} />
                : false
        }
        </div>
    );
});

export default TreeRoot;