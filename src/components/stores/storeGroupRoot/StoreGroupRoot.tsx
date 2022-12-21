import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./StoreGroupRoot.module.css"
import {NomenclatureItem} from "../../../structs/nomenclature";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Fetches} from "../../../fetches/Fetches";
import {Tools} from "../../../tools/Tools";

import {RouterPath} from "../../../router";
import {OnNomenclatureDragEnter} from "../../../gragAndDrops/Nomenclature/nomenclature";
import {SetSelectedNomenclatureGroupState} from "../../../store/action_creator/AppStoreActions";
import NomenclatureItemView from "../../nomenclatureItemsShow/NomenclatureItemView";
import {StoreGroupGui} from "./storeGroupTexts";

const StoreGroupRoot = () => {

    const {storeGroupRoot} = useTypeSelector(state => state.appReducer)
    const [hisItems, setHisItems] = useState<NomenclatureItem[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {
        if (storeGroupRoot) {
            storeGroupRoot.callReBoot = () => storeGroupRootReboot()
            storeGroupRootReboot()
        }
    }, )


    function storeGroupRootReboot() {
        if (storeGroupRoot) {
            Fetches.GetStoreGroupItems(storeGroupRoot).then(r => {
                console.log(r)
                if (!(r instanceof Error)) {
                    if (!Tools.isItemsIdentical(r, hisItems)) {
                        if (r != null) {
                            r.map((it: NomenclatureItem) => it.ownerItem = storeGroupRoot)

                        }
                        setHisItems(() => r)
                    }
                }

            })
        }
    }

    if (storeGroupRoot) {

        return (
            <div className={cl.wrapper} onClick={event => event.stopPropagation()}>

                <div className={cl.wrapper_tools}>
                    <span title={StoreGroupGui.CURRENT_SELECTED_GROUP.title}>{StoreGroupGui.CURRENT_SELECTED_GROUP.text}: {storeGroupRoot.name} </span>

                    <button
                        onClick={() => navigate(RouterPath.MAKE_NOMENCLATURE_GROUP)}
                        title={StoreGroupGui.MAKE_SUB_GROUP.title}>{StoreGroupGui.MAKE_SUB_GROUP.text}
                    </button>

                    <button
                        onClick={() => navigate(RouterPath.MAKE_NOMENCLATURE_ITEM)}
                        title={StoreGroupGui.MAKE_GROUP_ITEM.title}
                    >
                        {StoreGroupGui.MAKE_GROUP_ITEM.text}
                    </button>
                    <img src="images/rename.png" alt={StoreGroupGui.MODIFY_STORE_GROUP.title}
                         onClick={() => navigate(RouterPath.MODIFY_NOMENCLATURE_GROUP)}/>

                </div>
              {/*  <div className={cl.wrapper_content_nomenclature_group_name}
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
                </div>*/}
            </div>
        );
    }
    return (<div/>)
};

export default StoreGroupRoot;