import React, {FC, useEffect, useState} from 'react';
import {NomenclatureItem} from "../../structs/nomenclature";
// @ts-ignore
import cl from "./NomenclatureShow.module.css"
import {
    ConfirmReplace,
    OnNomenclatureDragEnter,
    onNomenclatureGroupDrag
} from "../../gragAndDrops/Nomenclature/nomenclature";
import {AppItemMasks} from "../../App";
import {Fetches} from "../../fetches/Fetches";
import {useDispatch} from "react-redux";
import {SetSelectedNomenclatureGroupState} from "../../store/action_creator/AppStoreActions";
import {Tools} from "../../tools/Tools";


interface ShowCatalogItemProps {
    item: NomenclatureItem


}

const NomenclatureItemView: FC<ShowCatalogItemProps> = ({item}) => {
    Tools.LoadCatalogItemFields(item)
    const dispatch=useDispatch()
    const [hisItems, setHisItems] = useState<NomenclatureItem[] | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(item.isOpen?item.isOpen:false)

    item.callReBoot=()=>onNomenclatureGroupClick()

    useEffect(()=>{
        console.log(item)
        if(item.isOpen){
            getHisItems()
        }
    })

    const getHisItems=()=>{
        Fetches.GetNomenclatureItems(item).then(r => {
            if (!(r instanceof Error) && r.length > 0 && (hisItems == null)) {
                r.map((it: NomenclatureItem) => it.ownerItem = item)
                setHisItems(() => r)
            }

        })
    }

    const onNomenclatureGroupClick = () => {
         getHisItems()
        item.isOpen=!isOpen
        Tools.SaveCatalogItemFields(item)
        setIsOpen(()=>!isOpen)
        // @ts-ignore
        dispatch(SetSelectedNomenclatureGroupState(item))


    }

    const onCatalogItemClick = () => {

    }


    const onDragEnterToItem = (e: React.DragEvent<HTMLDivElement>) => {

        e.currentTarget.classList.add(cl.dragEnter)
        OnNomenclatureDragEnter(item)
    }

    const onDragLeaveFromItem = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.classList.remove(cl.dragEnter)

    }


    if ((item.mask & AppItemMasks.CATALOG_MASK) == AppItemMasks.CATALOG_MASK) {
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

    if ((item.mask & AppItemMasks.CATALOG_ITEM_MASK) == AppItemMasks.CATALOG_ITEM_MASK)
        return (
            <div onClick={e => e.stopPropagation()} className={cl.wrapper_content_nomenclature_item}>
                <div className={cl.wrapper_content_nomenclature_item_name}
                    onClick={onCatalogItemClick}
                    draggable={true}
                    onDragStart={() => onNomenclatureGroupDrag(item)}
                    key={"CatalogNode" + item.uuid}

                >&#9679;  {item.name}</div>

            </div>
        )
    return (<div/>)

};

export default NomenclatureItemView;