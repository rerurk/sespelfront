import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./NomenclatureShow.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";

import NomenclatureItemView from "./NomenclatureItemView";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";
import {SetSelectedNomenclatureGroupState} from "../../store/action_creator/AppStoreActions";

import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {NomenclatureGui} from "./Texts";
import {Tools} from "../../tools/Tools";
import {OnItemDragEnter} from "../../gragAndDrops/Nomenclature/nomenclature";
import {ExtendedItem} from "../../structs/App";


const NomenclatureRoot: FC = () => {

    const {nomenclatureRoot, selectedNomenclatureGroup,selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)
    const [hisItems, setHisItems] = useState<ExtendedItem[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {

        if (nomenclatureRoot) {
            nomenclatureRoot.callReBoot = () => nomenclatureRootReboot()
            nomenclatureRootReboot()
        }
    },[nomenclatureRoot])


    function nomenclatureRootReboot() {

        if (nomenclatureRoot) {
            Fetches.GetItems(nomenclatureRoot).then(r => {
                if (!(r instanceof Error)) {
                    if (!Tools.isItemsIdentical(r, hisItems)) {
                        if (r != null) {
                            r.map((it: ExtendedItem) => it.ownerItem = nomenclatureRoot)

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

                    <div className={cl.wrapper_tools_BTS}>
                        <img onClick={() => navigate(RouterPath.MAKE_NOMENCLATURE_GROUP)}
                             alt={NomenclatureGui.MAKE_SUB_GROUP.title}
                             src="/images/add_folder.png"
                        />


                        <button
                            onClick={() => navigate(RouterPath.MAKE_NOMENCLATURE_ITEM_PAGE)}
                            title={NomenclatureGui.MAKE_GROUP_ITEM.title}
                        >
                            {NomenclatureGui.MAKE_GROUP_ITEM.text}
                        </button>
                        <img src="images/rename.png" alt={NomenclatureGui.MODIFY_NOMENCLATURE_GROUP.title}
                             onClick={() => navigate(RouterPath.MODIFY_NOMENCLATURE_GROUP)}/>
                    </div>
                    <span
                        title={NomenclatureGui.NOMENCLATURE_SELECTED_GROUP.title}>{NomenclatureGui.NOMENCLATURE_SELECTED_GROUP.text}: <strong>{nomenclatureRoot.uuid !== selectedNomenclatureGroup?.uuid ? selectedNomenclatureGroup?.name : nomenclatureRoot.name}</strong>
                    </span>
                    <span
                        title={NomenclatureGui.NOMENCLATURE_SELECTED_ITEM.title}>{NomenclatureGui.NOMENCLATURE_SELECTED_ITEM.text}: <strong>{selectedNomenclatureItem?selectedNomenclatureItem.name:""}</strong>
                    </span>
                </div>
                <div className={cl.wrapper_content_nomenclature_group_name}
                     onDragEnter={() => OnItemDragEnter(nomenclatureRoot)}
                     onClick={() => {
                         // @ts-ignore
                         dispatch(SetSelectedNomenclatureGroupState(nomenclatureRoot))
                     }}
                >

                    <span>{nomenclatureRoot.name}:</span>

                </div>
                <div className={cl.wrapper_content}>
                    {hisItems
                        ? hisItems.map((it: ExtendedItem) =>
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