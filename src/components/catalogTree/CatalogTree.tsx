import React, {FC, useEffect} from 'react';
// @ts-ignore
import cl from "./CatalogTree.module.css"
import CatalogView from "../catalogView/CatalogView";
import {Fetches} from "../../fetches/Fetches";
import {CatalogItem, CatalogNode} from "../../structs/catalog";
import {useDispatch} from "react-redux";
import {SetCatalogRootState, SetShowCatalogState} from "../../store/action_creator/showCatalogNode";
import {useTypeSelector} from "../../hooks/useTypeSelector";



const CatalogTree: FC = () => {
    const {catalogRoot} = useTypeSelector(state => state.showCatalogNode)
    useEffect(()=>{
        if (!catalogRoot){
            Fetches.GetMainCatalogItem().then(item => {
                    if (!(item instanceof Error)) {

                        Fetches.GetCatalogItems(item).then(items => {
                            if (!(items instanceof Error)) {
                                item.items = items
                                let catalogNode: CatalogNode = {
                                    parent: null,
                                    self: item
                                }


                                // @ts-ignore
                                dispatch(SetShowCatalogState(catalogNode))
                                // @ts-ignore
                                dispatch(SetCatalogRootState(catalogNode.self))

                            }
                        })
                    }
                }
            )

        }
    },[])
    const dispatch=useDispatch()


    return (
        <div className={cl.wrapper}>{
            catalogRoot
                ? <CatalogView item={catalogRoot} key={catalogRoot.ref} parentItem={null}/>
                : false
        }
        </div>
    );
};

export default CatalogTree;