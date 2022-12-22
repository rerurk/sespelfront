import React, {FC, useState} from 'react';
import {StoreItem} from "../../../structs/StoreAssets";
// @ts-ignore
import cl from "./StoreGroupItem.module.css"
import {AppItemTYPES} from "../../../App";
import {Fetches} from "../../../fetches/Fetches";
import {Tools} from "../../../tools/Tools";
import {NomenclatureItem} from "../../../structs/nomenclature";
import {
    ConfirmReplace,
    OnNomenclatureDragEnter,
    onNomenclatureGroupDrag
} from "../../../gragAndDrops/Nomenclature/nomenclature";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    SetAssetsStore,
    SetCurrentNomenclatureItemState,
    SetSelectedNomenclatureGroupState, SetSelectedStoreGroupState
} from "../../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../../router";

interface StoreGroupItemProps {
    item: StoreItem
}

const StoreGroupItem: FC<StoreGroupItemProps> = ({item}) => {
    Tools.LoadCatalogItemFields(item)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [hisItems, setHisItems] = useState<NomenclatureItem[] | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(item.isOpen ? item.isOpen : false)

    item.callReBoot = getHisItems
    if (item.isOpen) {
        getHisItems()
    }

    function getHisItems() {
        Fetches.GetStoreGroupItems(item).then(r => {
            if (!(r instanceof Error)) {
                if (!Tools.isItemsIdentical(r, hisItems)) {
                    if (r != null) {
                        r.map((it: NomenclatureItem) => it.ownerItem = item)

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

    }

    const onStoreClick = () => {
     // @ts-ignore
        dispatch(SetAssetsStore(item))
    }



    if ((item.type & AppItemTYPES.STORE_GROPE_TYPE) ===AppItemTYPES.STORE_GROPE_TYPE) {
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
                            ? cl.wrapper_content_nomenclature_subGroups
                            : cl.wrapper_content_nomenclature_subGroups_hidden
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

    if ((item.type & AppItemTYPES.ASSETS_STORE_TYPE) ===AppItemTYPES.ASSETS_STORE_TYPE)
        return (
            <div onClick={e => e.stopPropagation()} className={cl.wrapper_content_nomenclature_item}>
                <div className={cl.wrapper_content_nomenclature_item_name}
                     onClick={onStoreClick}
                     draggable={true}

                > <strong onClick={(e)=>{e.stopPropagation()}}>+</strong> &#9679;  {item.name}

                </div>

            </div>
        )
    return (<div/>)
};

export default StoreGroupItem;