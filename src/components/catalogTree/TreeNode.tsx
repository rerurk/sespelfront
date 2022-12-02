import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./TreeNode.module.css"


import {CatalogItem, TransferCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


import {Masks} from "../../masks/Masks";
import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";
import {useDispatch} from "react-redux";
import {CatalogAndItems, ShowCatalogState} from "../../store/types/CatalogStoreTypes";
import {SetCurrentCatalogState} from "../../store/action_creator/CatalogStoreActions";
import {GetCurrentState} from "../../store/reducers/CatalogStoreReducer";


interface CatalogViewProps {
    item: CatalogItem


}

const showS = "v"
const hiddenS = ">"

const TreeNode: FC<CatalogViewProps> = ({item}) => {

    const [hisItems, setHisItems] = useState<CatalogItem[]>([])
    const [showText, setShowText] = useState<string>(hiddenS)
    const [showClass, setShowClass] = useState<string>(cl.wrapper__catalog_hidden)
    const [isItemsHidden, setIsItemsHidden] = useState<boolean>(true)



    item.callReBoot = () => itemReboot()
    item.callShow = () => onCatalogNameClick()



    const dispatch = useDispatch()

    const showCatalog=()=>{
        console.log("Call showCatalog:",item.name)
        console.log("HIS ITEMS",hisItems)
        // @ts-ignore
        dispatch(SetCurrentCatalogState(item))
    }

    const onCatalogNameClick = () => {

        let f:Function=showCatalog
        setItems(f)


    }

    const setItems = (f?:Function) => {
        getItems().then(items => {
                tryToSetItems(items)
            if(f){f()}

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


        if (items && !(items instanceof Error)  && items !== hisItems) {

            items.forEach((it: CatalogItem) => it.parent = item)
            item.items = items
            setHisItems(()=> items)

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

        if (GetCurrentState().currentShowCatalog.name==item.name){
            setItems(showCatalog)
        }else {
            setItems()
        }
    }

    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()} draggable={false}>
            {((item.mask & Masks.CATALOG_MASK) == Masks.CATALOG_MASK)
                ? <div className={cl.wrapper__name_table}>
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

                        <span
                        >
                            {item.name}
                        </span>


                    </div>
                    <div className={showClass}>
                        {
                            (hisItems.length>0)
                                ? hisItems.map((item: CatalogItem) => <TreeNode
                                    item={item}
                                    key={"TreeNode" + item.ref}

                                />)

                                : false
                        }
                    </div>

                </div>
                : false


            }
        </div>
    );
};

export default TreeNode;