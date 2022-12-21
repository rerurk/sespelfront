import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./NomenclatureShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";


import {NomenclatureItem} from "../../structs/nomenclature";
import NomenclatureItemView from "./NomenclatureItemView";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";
import {SetSelectedNomenclatureGroupState} from "../../store/action_creator/AppStoreActions";
import {OnNomenclatureDragEnter} from "../../gragAndDrops/Nomenclature/nomenclature";
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {NomenclatureGui} from "./Texts";
import {Tools} from "../../tools/Tools";


const NomenclatureRoot: FC = () => {

    const {nomenclatureRoot, selectedNomenclatureGroup} = useTypeSelector(state => state.appReducer)
    const [hisItems, setHisItems] = useState<NomenclatureItem[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {
        if (nomenclatureRoot) {
            nomenclatureRoot.callReBoot = () => nomenclatureRootReboot()
            nomenclatureRootReboot()
        }
    }, [nomenclatureRoot])


    function nomenclatureRootReboot() {
        if (nomenclatureRoot) {
            Fetches.GetNomenclatureItems(nomenclatureRoot).then(r => {
                if (!(r instanceof Error)) {
                    if (!Tools.isItemsIdentical(r, hisItems)) {
                        if (r != null) {
                            r.map((it: NomenclatureItem) => it.ownerItem = nomenclatureRoot)

                        }
                        setHisItems(() => r)
                    }
                }

            })
        }
    }

    if (nomenclatureRoot) {

        return (
            <div className={cl.wrapper} onClick={event => event.stopPropagation()}>

                <div className={cl.wrapper_tools}>
                    <span title={NomenclatureGui.CURRENT_SELECTED_GROUP.title}>{NomenclatureGui.CURRENT_SELECTED_GROUP.text}: <strong>{nomenclatureRoot.uuid != selectedNomenclatureGroup?.uuid ? selectedNomenclatureGroup?.name : nomenclatureRoot.name}</strong></span>

                    <button
                        onClick={() => navigate(RouterPath.MAKE_NOMENCLATURE_GROUP)}
                        title={NomenclatureGui.MAKE_SUB_GROUP.title}>{NomenclatureGui.MAKE_SUB_GROUP.text}
                    </button>

                    <button
                        onClick={() => navigate(RouterPath.MAKE_NOMENCLATURE_ITEM)}
                        title={NomenclatureGui.MAKE_GROUP_ITEM.title}
                    >
                        {NomenclatureGui.MAKE_GROUP_ITEM.text}
                    </button>
                    <img src={"images/rename.png"} title={NomenclatureGui.MODIFY_NOMENCLATURE_GROUP.title}
                         onClick={() => navigate(RouterPath.MODIFY_NOMENCLATURE_GROUP)}/>

                </div>
                <div className={cl.wrapper_content_nomenclature_group_name}
                     onDragEnter={() => OnNomenclatureDragEnter(nomenclatureRoot)}
                     onClick={() => {
                         // @ts-ignore
                         dispatch(SetSelectedNomenclatureGroupState(nomenclatureRoot))
                     }}
                >

                    <span>{nomenclatureRoot.name}:</span>

                </div>
                <div className={cl.wrapper_content}>
                    {hisItems
                        ? hisItems.map((it: NomenclatureItem) =>
                            <NomenclatureItemView
                                item={it}
                                key={"NomenclatureItemView" + it.uuid}/>)
                        : false
                    }
                </div>
            </div>
        );
    }
    return (<div/>)


};

export default NomenclatureRoot;