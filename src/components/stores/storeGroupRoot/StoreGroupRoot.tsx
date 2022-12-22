import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./StoreGroupRoot.module.css"
import {NomenclatureItem} from "../../../structs/nomenclature";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Fetches} from "../../../fetches/Fetches";
import {Tools} from "../../../tools/Tools";
import {StoreGroupGui} from "./storeGroupTexts";
import {StoreItem} from "../../../structs/StoreAssets";
import StoreGroupItem from "../storeGroupItem/StoreGroupItem";
import InputText from "../../UI/inputText/InputText";


const StoreGroupRoot = () => {

    const {storeGroupRoot, selectedStoreGroup} = useTypeSelector(state => state.appReducer)
    const [hisItems, setHisItems] = useState<StoreItem[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    let s:Function

    useEffect(() => {

        if (storeGroupRoot) {
            storeGroupRoot.callReBoot = storeGroupRootReboot
            storeGroupRootReboot()
        }

    },[storeGroupRoot])


    function storeGroupRootReboot() {

        if (storeGroupRoot) {
            Fetches.GetStoreGroupItems(storeGroupRoot).then(r => {
                if (!(r instanceof Error)) {
                    console.log("StoreGroupRoot СРАБАТЫВАЕТ ")
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
    function showInput() {

    }

    if (storeGroupRoot) {

        return (
            <div className={cl.wrapper} onClick={event => event.stopPropagation()}>

                <div className={cl.wrapper_tools}>

                    <div className={cl.wrapper_tools_BTS}>
                        <img
                            onClick={()=>showInput()}
                             alt={StoreGroupGui.MAKE_SUB_GROUP.title}
                             src="/images/add_folder.png"
                        />

                        <button

                            title={StoreGroupGui.MAKE_GROUP_ITEM.title}
                        >
                            {StoreGroupGui.MAKE_GROUP_ITEM.text}
                        </button>
                        <img src="images/rename.png" alt={StoreGroupGui.MODIFY_STORE_GROUP.title}/>

                    </div>
                    <span
                        title={StoreGroupGui.CURRENT_SELECTED_GROUP.title}>{StoreGroupGui.CURRENT_SELECTED_GROUP.text}: {selectedStoreGroup?.name}
                    </span>
                </div>
                {
                    hisItems
                        ? hisItems.map((it: StoreItem) => <StoreGroupItem item={it} key={"StoreGroupItem_" + it.uuid} />)
                        : false
                }
                <InputText />
            </div>
        );
    }
    return (<div/>)
};

export default StoreGroupRoot;