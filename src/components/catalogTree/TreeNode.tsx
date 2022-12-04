import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./TreeNode.module.css"


import {CatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";

import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";
import {useDispatch} from "react-redux";

import {SetCurrentCatalogState} from "../../store/action_creator/CatalogStoreActions";
import {GetCurrentState} from "../../store/reducers/CatalogStoreReducer";
import FilterNode from "./FilterNode";
import {ErrorsText} from "../../texts/Texts";
import {Tools} from "../../tools/Tools";


interface CatalogViewProps {
    item: CatalogItem


}

const showS = "v"
const hiddenS = ">"

const TreeNode: FC<CatalogViewProps> = ({item}) => {
      Tools.LoadCatalogItemFields(item)

    let showText: string
    let showClass: string

    const [reLoad, setReaLoad] = useState<boolean>(false)

    if (item.isOpen ) {
        showClass = ""
        showText =showS
        if(!item.items) {
            setItems()
        }

    } else {
        showClass = cl.wrapper__catalog_hidden
        showText = hiddenS
    }

    item.callReBoot = () => itemReboot()
    item.callShow = () => onCatalogNameClick()

    const dispatch = useDispatch()

    const showCatalog = () => {

        // @ts-ignore
        dispatch(SetCurrentCatalogState(item))
    }

    const onCatalogNameClick = () => {
        let f: Function = showCatalog
        setItems(f)

    }

   function setItems  (f?: Function)  {

        getItems().then(items => {

            tryToSetItems(items)
                if (f) {
                    f()
                }

            }
        )
    }

    const showItemCatalogs = () => {
        if(item.isOpen){

        }else {

        }
        item.isOpen=!item.isOpen
        setReaLoad(()=>!reLoad)
        Tools.SaveCatalogItemFields(item)



    }

    const tryToSetItems = (items: CatalogItem[] | Error) => {

        if (items instanceof Error) {
            alert(ErrorsText.ERROR_GET_DATA)
        }
        if (!(items instanceof Error) && items === null) {
            items = []
        }

        if (items && !(items instanceof Error) && items && item.items != items) {

            items.forEach((it: CatalogItem) => {
                it.owner = item
            })
            item.items = items
            setReaLoad(r=>!r)
        }
    }

    async function getItems(): Promise<CatalogItem[] | Error> {

        return Fetches.GetCatalogItems(item)
    }


    //drags
    const onDragEnterToItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.add(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(item)
    }

    const onDragLeaveFromItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.remove(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(item)
    }

   const onItemDragEnd=()=>{
        ConfirmReplace().then(r => {
            if (!(r instanceof Error)) {

            }
        })
    }

    const itemReboot = () => {

        if (GetCurrentState().currentCatalog.name == item.name) {
            setItems(showCatalog)
        } else {
            setItems()
        }
    }

    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()} draggable={false}>

            <div>
                <div className={cl.wrapper___catalog_name}
                     draggable={true}
                     onDrag={() => onItemDrag(item)}
                     onDragEnter={(e) => onDragEnterToItem(e)}
                     onDragLeave={e => onDragLeaveFromItem(e)}
                     onDragEnd={onItemDragEnd}
                     onClick={onCatalogNameClick}

                >

                    <div  onClick={e => e.stopPropagation() }
                        /*
                         кнопка открывания дирректории
                    */

                    >
                        <div className={cl.wrapper__open_catalog_bt} onClick={showItemCatalogs}>{showText}</div>

                    </div>

                    <span>{item.name}</span>


                </div>
                <div className={showClass}>
                    {
                        (item.items)
                            ? item.items.map((it: CatalogItem) => <FilterNode item={it} key={"fn" + it.ref}/>)
                            : false
                    }
                </div>

            </div>

        </div>
    );
};

export default TreeNode;