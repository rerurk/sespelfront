import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./TreeNode.module.css"


import {CatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";

import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";
import {useDispatch} from "react-redux";

import {SetCurrentCatalogState} from "../../store/action_creator/CatalogStoreActions";
import {GetCurrentState} from "../../store/reducers/CatalogStoreReducer";
import FilterNode from "./FilterNode";


interface CatalogViewProps {
    item: CatalogItem


}

const showS = "v"
const hiddenS = ">"

const TreeNode: FC<CatalogViewProps> = ({item}) => {

    const [reb, setReb] = useState<boolean>(true)
    const [showText, setShowText] = useState<string>(hiddenS)
    const [showClass, setShowClass] = useState<string>(cl.wrapper__catalog_hidden)
    const [isItemsHidden, setIsItemsHidden] = useState<boolean>(true)


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

    const setItems = (f?: Function) => {
        getItems().then(items => {
                tryToSetItems(items)
                if (f) {
                    f()
                }

            }
        )
    }


    const onShowClick = () => {

        if (isItemsHidden) {
            setItems()
            setShowClass(cl.wrapper__catalog_show)
            setShowText(showS)

        } else {
            setShowClass(cl.wrapper__catalog_hidden)
            setShowText(hiddenS)
        }
        setIsItemsHidden(() => !isItemsHidden)


    }

    const tryToSetItems = (items: CatalogItem[] | Error) => {
        if(items && !(items instanceof Error) && item.items && items.length===item.items.length){
            return
        }

        if (items && !(items instanceof Error) && items && item.items != items) {

            items.forEach((it: CatalogItem) => it.owner = item)
            item.items = items
            setReb(() => !reb)
            console.log("SetNewItems")

        }
    }

    async function getItems(): Promise<CatalogItem[] | Error> {

        return Fetches.GetCatalogItems(item)
    }

    const onDragEnterToItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.add(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(item)
    }

    const onDragLeaveFromItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.remove(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(item)
    }

    function onItemDragEnd() {
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

                 <div className={cl.wrapper__name_table}>
                    <div className={cl.wrapper___catalog_name}
                         draggable={true}
                         onDrag={() => onItemDrag(item)}
                         onDragEnter={(e) => onDragEnterToItem(e)}
                         onDragLeave={e => onDragLeaveFromItem(e)}
                         onDragEnd={onItemDragEnd}
                         onClick={onCatalogNameClick}

                    >

                        <div onClick={e => e.stopPropagation()}
                            /*
                             кнопка открывания дирректории
                        */

                        >
                            <div className={cl.wrapper_showCatalog} onClick={() => onShowClick()}>{showText}</div>

                        </div>

                        <span>{item.name}</span>


                    </div>
                    <div className={showClass}>
                        {

                            (item.items && item.items.length > 0)
                                ? item.items.map((it: CatalogItem) =><FilterNode item={it} key={"fn"+it.ref}/>)
                                : false
                        }
                    </div>

                </div>

        </div>
    );
};

export default TreeNode;