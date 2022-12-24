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
import {RouterPath} from "../../../router";
import {SetSelectedStoreGroupState} from "../../../store/action_creator/AppStoreActions";
import {OnStoreItemDragEnter} from "../../../gragAndDrops/storeItemsDrag/storeItemsDrag";


const StoreGroupRoot = () => {

    const {storeGroupRoot, selectedStoreGroup,selectedStore} = useTypeSelector(state => state.appReducer)
    const [hisItems, setHisItems] = useState<StoreItem[] | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    console.log(selectedStore,selectedStoreGroup)

    useEffect(() => {

        if (storeGroupRoot) {
            storeGroupRoot.callReBoot = storeGroupRootReboot
            storeGroupRootReboot()
        }

    }, [storeGroupRoot])


    function storeGroupRootReboot() {

        if (storeGroupRoot) {
            Fetches.GetItems(storeGroupRoot).then(r => {
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

    function onRootClick() {
        // @ts-ignore
        dispatch(SetSelectedStoreGroupState(storeGroupRoot))
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


                        <img src="images/rename.png" alt={StoreGroupGui.MODIFY_STORE_GROUP.title}/>

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
                        ? hisItems.map((it: StoreItem) => <StoreGroupItem item={it} key={"StoreGroupItem_" + it.uuid}/>)
                        : false
                }

            </div>
        );
    }
    return (<div/>)
};

export default StoreGroupRoot;