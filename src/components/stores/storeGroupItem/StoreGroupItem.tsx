import React, {FC, useState} from 'react';
import {StoreItem} from "../../../structs/StoreAssets";
// @ts-ignore
import cl from "./StoreGroupItem.module.css"
import {AppItemTYPES} from "../../../App";
import {Fetches} from "../../../fetches/Fetches";
import {Tools} from "../../../tools/Tools";


import {useDispatch} from "react-redux";

import {SetSelectedAssetsStoreState, SetSelectedStoreGroupState} from "../../../store/action_creator/AppStoreActions";

import {
    ConfirmReplaceStoreItem,
    OnStoreItemDragEnter,
    OnStoreItemDragStart
} from "../../../gragAndDrops/storeItemsDrag/storeItemsDrag";

interface StoreGroupItemProps {
    item: StoreItem
}

const StoreGroupItem: FC<StoreGroupItemProps> = ({item}) => {
    Tools.LoadCatalogItemFields(item)
    const dispatch = useDispatch()
    const [hisItems, setHisItems] = useState<StoreItem[] | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(item.isOpen ? item.isOpen : false)

    item.callReBoot = getHisItems
    if (item.isOpen) {
        getHisItems()
    }

    function getHisItems() {
        Fetches.GetItems(item).then(r => {
            if (!(r instanceof Error)) {
                if (!Tools.isItemsIdentical(r, hisItems)) {
                    if (r != null) {
                        r.map((it: StoreItem) => it.ownerItem = item)

                    }
                    setHisItems(() => r)
                }
            }

        })
    }

    function onGroupClick() {
        getHisItems()
        item.isOpen = !isOpen
        Tools.SaveCatalogItemFields(item)
        setIsOpen(() => !isOpen)
        // @ts-ignore
        dispatch(SetSelectedStoreGroupState(item))
        // @ts-ignore
        dispatch(SetSelectedAssetsStoreState(null))

    }

    const onStoreClick = () => {
        getHisItems()
        item.isOpen = !isOpen
        Tools.SaveCatalogItemFields(item)
        setIsOpen(() => !isOpen)
        // @ts-ignore
        dispatch(SetSelectedStoreGroupState(null))
        // @ts-ignore
        dispatch(SetSelectedAssetsStoreState(item))
    }

    const onItemDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.add(cl.dragEnter)
        OnStoreItemDragEnter(item)

    }
    const onItemDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove(cl.dragEnter)

    }


    if ((item.type & AppItemTYPES.STORE_GROPE_TYPE) === AppItemTYPES.STORE_GROPE_TYPE) {
        return (
            <div
                className={cl.wrapper_store_grope_type}
                onClick={(event) => {
                    event.stopPropagation();
                    onGroupClick()
                }}


            >
                <div className={cl.wrapper_store_grope_type_name}
                     draggable={true}
                     onDragStart={() => OnStoreItemDragStart(item)}
                     onDragEnter={(e) => onItemDragEnter(e)}
                     onDragLeave={event => onItemDragLeave(event)}
                     onDragEnd={ConfirmReplaceStoreItem}

                >
                    <img
                        alt={""}
                        draggable={false}
                        src={isOpen
                            ? "/images/open_folder.png"
                            : "/images/folder.png"
                        }
                    />
                    <span draggable={false}>{item.name}</span>
                </div>
                <div

                    className={
                        isOpen
                            ? cl.wrapper_content_assetStore_subGroups
                            : cl.wrapper_content_assetStore_subGroups_hidden
                    }>

                    {
                        hisItems
                            ? hisItems.map((it) => <StoreGroupItem item={it}
                                                                   key={"StoreGroupItem" + it.uuid}/>)
                            : false
                    }
                </div>


            </div>

        );
    }

    if ((item.type & AppItemTYPES.ASSETS_STORE_TYPE) === AppItemTYPES.ASSETS_STORE_TYPE)
        return (
            <div
                className={cl.wrapper_store_grope_type}
                onClick={(event) => {
                    event.stopPropagation();

                }}


            >
                <div className={cl.wrapper_store_grope_type_name}
                     draggable={true}
                     onDragStart={() => OnStoreItemDragStart(item)}
                     onDragEnter={(e) => onItemDragEnter(e)}
                     onDragLeave={event => onItemDragLeave(event)}
                     onDragEnd={ConfirmReplaceStoreItem}
                     onClick={onStoreClick}

                >
                    <img
                        alt={""}
                        draggable={false}
                        src={isOpen
                            ? "/images/store.png"
                            : "/images/store.png"
                        }
                    />
                    <span draggable={false}>{item.name}</span>
                </div>
                <div

                    className={
                        isOpen
                            ? cl.wrapper_content_assetStore_subGroups
                            : cl.wrapper_content_assetStore_subGroups_hidden
                    }>

                    {
                        hisItems
                            ? hisItems.map((it) => <StoreGroupItem item={it}
                                                                   key={"StoreGroupItem" + it.uuid}/>)
                            : false
                    }
                </div>


            </div>

        );
    return (<div/>)
};

export default StoreGroupItem;