import React, {FC, useEffect} from 'react';
// @ts-ignore
import cl from "./NomenclatureShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";


import {NomenclatureItem, Item} from "../../structs/nomenclature";
import NomenclatureItemView from "./NomenclatureItemView";
import CatalogMenu from "../catalogMenu/CatalogMenu";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";
import {SetNomenclatureRootState} from "../../store/action_creator/AppStoreActions";




const NomenclatureRoot: FC = () => {

    const {nomenclatureRoot} = useTypeSelector(state => state.showCatalogNode)
    const dispatch=useDispatch()
    useEffect(() => {
        if (nomenclatureRoot) {
            Fetches.GetNomenclatureItems(nomenclatureRoot).then(r => {
                if(!(r instanceof Error)&&r.length>0&&(nomenclatureRoot.items==null)) {
                    r.map((it:NomenclatureItem)=>it.ownerItem=nomenclatureRoot)
                    nomenclatureRoot.items = r
                    // @ts-ignore
                    dispatch(SetNomenclatureRootState(nomenclatureRoot))
                }
            })
        }
    }, [nomenclatureRoot])

    if (nomenclatureRoot && nomenclatureRoot.items) {

        return (
            <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
                <div className={cl.wrapper_head}>
                    <span>тут будут кноки</span>
                </div>
                <div className={cl.wrapper_content}>
                    {
                        nomenclatureRoot.items.map((it:NomenclatureItem)=><NomenclatureItemView item={it} key={"NomenclatureItemView"+it.uuid}/>)
                    }
                </div>
            </div>
        );
    }
    return (<div/>)


};

export default NomenclatureRoot;