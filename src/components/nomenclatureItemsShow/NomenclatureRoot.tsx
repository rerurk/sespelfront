import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./NomenclatureShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";


import {NomenclatureItem} from "../../structs/nomenclature";
import NomenclatureItemView from "./NomenclatureItemView";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";
import {SetNomenclatureRootState, SetSelectedNomenclatureGroupState} from "../../store/action_creator/AppStoreActions";
import {OnNomenclatureDragEnter} from "../../gragAndDrops/Nomenclature/nomenclature";
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";


const NomenclatureRoot: FC = () => {

    const {nomenclatureRoot,selectedNomenclatureGroup} = useTypeSelector(state => state.showCatalogNode)
    const [hisItems,setHisItems]=useState<NomenclatureItem[]|null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {
        if (nomenclatureRoot) {
            console.log("useEffect",nomenclatureRoot)
            nomenclatureRoot.callReBoot=()=>nomenclatureRootReboot()
            nomenclatureRootReboot()
        }
    }, [nomenclatureRoot])


    function nomenclatureRootReboot() {
        if (nomenclatureRoot) {
            Fetches.GetNomenclatureItems(nomenclatureRoot).then(r => {
                console.log(r)
                if (!(r instanceof Error) && r.length > 0) {
                    r.map((it: NomenclatureItem) => it.ownerItem = nomenclatureRoot)
                    nomenclatureRoot.items = r
                    setHisItems(()=>r)

                }
            })
        }
    }

    if (nomenclatureRoot) {

        return (
            <div className={cl.wrapper} onClick={event => event.stopPropagation()}>

                <div className={cl.wrapper_tools}>
                    <span>Выбранная группа: {nomenclatureRoot.uuid!=selectedNomenclatureGroup?.uuid?selectedNomenclatureGroup?.name:nomenclatureRoot.name}</span>
                    <button onClick={()=>navigate(RouterPath.MAKE_NOMENCLATURE_GROUP)}>Создать подгруппу</button>
                    <button onClick={()=>navigate(RouterPath.MAKE_NOMENCLATURE_ITEM)}>Создать наименование</button>

                </div>
                <div className={cl.wrapper_content_nomenclature_group_name}
                     onDragEnter={() => OnNomenclatureDragEnter(nomenclatureRoot)}
                     onClick={()=>{
                         // @ts-ignore
                         dispatch(SetSelectedNomenclatureGroupState(nomenclatureRoot))
                     }}
                >

                    <span>{nomenclatureRoot.name}:</span>

                </div>
                <div className={cl.wrapper_content}>
                     {hisItems
                        ?hisItems.map((it: NomenclatureItem) =>
                            <NomenclatureItemView
                                item={it}
                               key={"NomenclatureItemView" + it.uuid}/>)
                         :false
                    }
                </div>
            </div>
        );
    }
    return (<div/>)


};

export default NomenclatureRoot;