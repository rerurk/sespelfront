import React, {FC, useState} from 'react';
import {NomenclatureItem} from "../../structs/nomenclature";
// @ts-ignore
import cl from "./NomenclatureShow.module.css"
import {
    ConfirmReplace,
    OnNomenclatureDragEnter,
    onNomenclatureGroupDrag
} from "../../gragAndDrops/Nomenclature/nomenclature";
import {AppItemTYPES} from "../../App";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";
import {
    SetCurrentNomenclatureItemState,
    SetSelectedNomenclatureGroupState
} from "../../store/action_creator/AppStoreActions";
import {Tools} from "../../tools/Tools";
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";


interface ShowCatalogItemProps {
    item: NomenclatureItem


}

const NomenclatureItemView: FC<ShowCatalogItemProps> = ({item}) => {
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
        Fetches.GetNomenclatureItems(item).then(r => {
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

    function onNomenclatureGroupClick() {
        getHisItems()
        item.isOpen = !isOpen
        Tools.SaveCatalogItemFields(item)
        setIsOpen(() => !isOpen)
        // @ts-ignore
        dispatch(SetSelectedNomenclatureGroupState(item))

    }

    const onCatalogItemClick = () => {
        // @ts-ignore
        dispatch(SetCurrentNomenclatureItemState(item))
        navigate(RouterPath.ALL_ASSETS_BY_CATALOG_NAME)
    }

    const onCreateAssetPress=()=>{
        // @ts-ignore
        dispatch(SetCurrentNomenclatureItemState(item))
        navigate(RouterPath.CREATE_ASSET)
    }


    const onDragEnterToItem = (e: React.DragEvent<HTMLDivElement>) => {

        e.currentTarget.classList.add(cl.dragEnter)
        OnNomenclatureDragEnter(item)
    }

    const onDragLeaveFromItem = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove(cl.dragEnter)

    }


    if ((item.type & AppItemTYPES.NOMENCLATURE_GROUP_TYPE) ===AppItemTYPES.NOMENCLATURE_GROUP_TYPE) {
        return (
            <div
                key={" NomenclatureItemView" + item.uuid}
                className={cl.wrapper_content_nomenclature_group}
                onClick={(event) => {
                    event.stopPropagation();
                    onNomenclatureGroupClick()
                }}


            >
                <div className={cl.wrapper_content_nomenclature_group_name}
                     draggable={true}
                     onDragStart={() => onNomenclatureGroupDrag(item)}
                     onDragEnter={(e: React.DragEvent<HTMLDivElement>) => onDragEnterToItem(e)}
                     onDragLeave={(e: React.DragEvent<HTMLDivElement>) => onDragLeaveFromItem(e)}
                     onDragEnd={ConfirmReplace}
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
                            ? hisItems.map((it) => <NomenclatureItemView item={it}
                                                                         key={"NomenclatureItemView" + it.uuid}/>)
                            : false
                    }
                </div>


            </div>

        );
    }

    if ((item.type & AppItemTYPES.NOMENCLATURE_ITEM_TYPE) ===AppItemTYPES.NOMENCLATURE_ITEM_TYPE)
        return (
            <div onClick={e => e.stopPropagation()} className={cl.wrapper_content_nomenclature_item}>
                <div className={cl.wrapper_content_nomenclature_item_name}
                     onClick={onCatalogItemClick}
                     draggable={true}
                     onDragStart={() => onNomenclatureGroupDrag(item)}
                     key={"CatalogNode" + item.uuid}

                > <strong onClick={(e)=>{e.stopPropagation();onCreateAssetPress()}}>+</strong> &#9679;  {item.name}

                </div>

            </div>
        )
    return (<div/>)

};

export default NomenclatureItemView;