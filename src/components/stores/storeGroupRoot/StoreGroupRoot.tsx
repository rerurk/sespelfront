import React, {useEffect, useState} from 'react';
import {useTypeSelector} from "../../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./StoreGroupRoot.module.css"

import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Fetches} from "../../../fetches/Fetches";
import {Tools} from "../../../tools/Tools";
import {StoreGroupGui} from "./storeGroupTexts";

import StoreTree from "../storeTree/StoreTree";
import {RouterPath} from "../../../router";
import {SetSelectedAssetsStoreState, SetSelectedStoreGroupState} from "../../../store/action_creator/AppStoreActions";
import {OnStoreItemDragEnter} from "../../../gragAndDrops/storeItemsDrag/storeItemsDrag";
import {ExtendedItem} from "../../../structs/App";


const StoreGroupRoot = () => {

    const {storeGroupRoot, selectedStoreGroup,selectedStore} = useTypeSelector(state => state.appReducer)
    const [hisItems, setHisItems] = useState<ExtendedItem[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    useEffect(() => {

        if (storeGroupRoot) {
            storeGroupRoot.callReBoot = storeGroupRootReboot
            storeGroupRootReboot()
        }

    }, [storeGroupRoot])


    function storeGroupRootReboot() {

        if (storeGroupRoot) {
            Fetches.GetItems(storeGroupRoot).then(r => {
                console.log("storeGroupRootReboot: FETCH",r)
                if (!(r instanceof Error)) {
                    if (!Tools.isItemsIdentical(r, hisItems)) {
                        if (r != null) {
                            let items:ExtendedItem[]=r
                            items.map((it:ExtendedItem) => it.ownerItem = storeGroupRoot)

                        }
                        setHisItems(() => r)
                    }
                }

            })
        }
    }

    function onRootClick() {
        // @ts-ignore
        dispatch(SetSelectedStoreGroupState(storeGroupRoot))
        // @ts-ignore
        dispatch(SetSelectedAssetsStoreState(null))
    }

    const onItemDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add(cl.dragEnter)
        if (storeGroupRoot) {
            OnStoreItemDragEnter(storeGroupRoot)
        }
    }

    if (storeGroupRoot) {

        return (
            <div draggable={false} className={cl.wrapper} onClick={event => event.stopPropagation()}>

                <div className={cl.wrapper_tools} onClick={() => onRootClick()}>

                    <div className={cl.wrapper_tools_BTS} onClick={e => e.stopPropagation()}>

                        <img className={selectedStore?cl.hidden:""}
                            onClick={() => navigate(RouterPath.CREATE_STORE_GROPE)}
                            alt={StoreGroupGui.MAKE_SUB_GROUP.title}
                            src="/images/add_folder.png"
                        />
                        <img
                            onClick={() => navigate(RouterPath.CREATE_ASSETS_STORE)}
                            alt={StoreGroupGui.MAKE_GROUP_ITEM.title}
                            src="/images/add_store.png"
                        />


                        <img src="images/rename.png" alt={StoreGroupGui.MODIFY_STORE_GROUP.title}
                          onClick={()=>navigate(RouterPath.MODIFY_STORE_GROPE)}
                        />

                    </div>
                    <div onDragEnter={onItemDragEnter}>

                        {selectedStoreGroup
                            ?<span>Текущая группа: {selectedStoreGroup.name}</span>
                            :<span>Текущий склад: {selectedStore?.name}</span>
                        }

                    </div>
                </div>
                {
                    hisItems
                        ? hisItems.map((it: ExtendedItem) => <StoreTree item={it} key={"StoreGroupItem_" + it.uuid}/>)
                        : false
                }

            </div>
        );
    }
    return (<div/>)
};

export default StoreGroupRoot;