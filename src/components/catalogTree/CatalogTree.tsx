import React, {FC, useEffect} from 'react';
// @ts-ignore
import cl from "./CatalogTree.module.css"
import CatalogView from "../catalogView/CatalogView";
import {Fetches} from "../../fetches/Fetches";

import {SetCatalogRootState, SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useDispatch} from "react-redux";



const CatalogTree: FC = () => {
    const {catalogRoot} = useTypeSelector(state => state.showCatalogNode)
    const dispatch=useDispatch()
    useEffect(()=>{
        if (!catalogRoot){
            Fetches.GetMainCatalogItem().then(root => {
                    if (!(root instanceof Error)) {
                           console.log(root)
                        // @ts-ignore
                        dispatch(SetCurrentCatalogState(root))
                        // @ts-ignore
                        dispatch(SetCatalogRootState(root))

                       /* Fetches.GetCatalogItems(root).then(items => {
                            if (!(items instanceof Error)) {
                                root.items = items
                                // @ts-ignore
                                dispatch(SetCurrentCatalogState(root))

                            }
                        })*/
                    }
                }
            )

        }
    },[])


    return (
        <div className={cl.wrapper}>{
            catalogRoot
                ? <CatalogView item={catalogRoot} key={"CatalogView"+catalogRoot.ref} />
                : false
        }
        </div>
    );
};

export default CatalogTree;