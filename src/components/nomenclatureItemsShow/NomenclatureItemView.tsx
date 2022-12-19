import React, {FC, useState} from 'react';
import {NomenclatureItem} from "../../structs/nomenclature";
// @ts-ignore
import cl from "./NomenclatureShow.module.css"

import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {ConfirmReplace, onNomenclatureGropeDrag, OnNomenclatureDragEnter} from "../../gragAndDrops/Nomenclature/nomenclature";
import {useDispatch} from "react-redux";
import {SetCurrentNomenclatureItemState, SetNomenclatureRootState} from "../../store/action_creator/AppStoreActions";
import {Menu, MenuAction, selectAction} from "../catalogMenu/menuActions";
import {AppItemMasks} from "../../App";
import {Fetches} from "../../fetches/Fetches";
import {it} from "node:test";


interface ShowCatalogItemProps {
    item: NomenclatureItem


}

const NomenclatureItemView: FC<ShowCatalogItemProps> = ({item}) => {


    const [hisItems, setHisItems] = useState<NomenclatureItem[] | null>(null)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onNomenclatureGroupClick = () => {
        Fetches.GetNomenclatureItems(item).then(r => {
            if (!(r instanceof Error) && r.length > 0 && (hisItems == null)) {
                r.map((it:NomenclatureItem)=>it.ownerItem=item)
                setHisItems(() => r)


            }
            setIsOpen(!isOpen)
        })


    }

    const onCatalogItemClick = () => {

    }


    const onDragEnterToItem = (e: React.DragEvent<HTMLDivElement>) => {

        e.currentTarget.classList.add(cl.dragEnter)
        OnNomenclatureDragEnter(item)
    }

    const onDragLeaveFromItem = (e: React.DragEvent<HTMLDivElement>) => {

        e.currentTarget.classList.remove(cl.dragEnter)
        OnNomenclatureDragEnter(item)
    }






    if ((item.mask & AppItemMasks.CATALOG_MASK) == AppItemMasks.CATALOG_MASK) {
        return (
            <div
                key={" NomenclatureItemView" + item.uuid}
                className={cl.wrapper_content_nomenclature_group}
                onClick={(event)=>{event.stopPropagation();onNomenclatureGroupClick()}}
                draggable={true}
                onDragStart={() => onNomenclatureGropeDrag(item)}
                onDragEnter={(e) => onDragEnterToItem(e)}
                onDragLeave={(e) => onDragLeaveFromItem(e)}
                onDragEnd={ConfirmReplace}

            >
                <div className={cl.wrapper_content_nomenclature_group_name}   draggable={false}>

                    <img

                        src={isOpen
                            ?"/images/open_folder.png"
                            :"/images/folder.png"
                        }
                    />
                    <span>{item.name}</span>
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
            <div onClick={e => e.stopPropagation()} className={cl.wrapper_content_nomenclature_item_name}>
                <div
                    onClick={onCatalogItemClick}
                    draggable={true}
                    onDragStart={() => onNomenclatureGropeDrag(item)}
                    key={"CatalogNode" + item.uuid}

                >{item.name}</div>

            </div>
        )
    return (<div/>)

};

export default NomenclatureItemView;