import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./TreeNode.module.css"


import {CatalogItem, TransferCatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


import {Masks} from "../../masks/Masks";
import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";
import {useDispatch} from "react-redux";
import {CatalogAndItems, ShowCatalogState} from "../../store/types/showCatalog";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";
import {GetCurrentState} from "../../store/reducers/showCatalogNode";


interface CatalogViewProps {
    item: CatalogItem


}

const showS="v"
const hiddenS=">"

const TreeNode: FC<CatalogViewProps> = ({ item}) => {

    const [hisItems, setHisItems] = useState<CatalogItem[]>([])
    const [showText, setShowText] = useState<string>(hiddenS)
    const [showClass, setShowClass] = useState<string>(cl.wrapper__catalog_hidden)
    const [isItemsHidden, setIsItemsHidden] = useState<boolean>(true)
    item.reBoot=()=>itemReboot()
    item.show=()=>onCatalogNameClick()

    const dispatch=useDispatch()

    const onCatalogNameClick=()=>{
             showAllCatalog()
    }

    const showAllCatalog=()=>{

            // @ts-ignore
        dispatch(SetCurrentCatalogState({item:item,items:null}))


    }

    const onShowClick = () => {

        if (isItemsHidden) {

            setShowClass(cl.wrapper__catalog_show)
            setShowText(showS)
             getItems().then(r=>tryToSetItems(r))

        } else {
            setShowClass(cl.wrapper__catalog_hidden)
            setShowText(hiddenS)
        }
        setIsItemsHidden(() => !isItemsHidden)


    }

    const tryToSetItems=(items:CatalogItem[]|Error)=>{


        if (items && !(items instanceof Error) && items.length!=hisItems.length)
        {
            items.forEach((it:CatalogItem)=>it.parent=item)
            item.items=items
            setHisItems(items)
        }
    }

    async function getItems ():Promise<CatalogItem[]|Error>{

       return  Fetches.GetCatalogItems(item)
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
        ConfirmReplace().then(r=>{
            if(!(r instanceof Error)){

            }
        })
    }

    const itemReboot =()=>{
           getItems().then(r=>tryToSetItems(r))
    }

    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()} draggable={false}>
            {((item.mask & Masks.CATALOG_MASK)==Masks.CATALOG_MASK)
                ? <div className={cl.wrapper__name_table}>
                    <div className={cl.wrapper___catalog_name}
                         draggable={true}
                         onDrag={() => onItemDrag(item)}
                         onDragEnter={(e) => onDragEnterToItem(e)}
                         onDragLeave={e => onDragLeaveFromItem(e)}
                         onDragEnd={onItemDragEnd}

                    >

                        <div
                            /*
                             кнопка открывания дирректории
                        */
                            className={cl.wrapper_showCatalog}
                            onClick={onShowClick}>
                            {showText}
                        </div>

                        <span onClick={onCatalogNameClick}
                        >
                            {item.name}
                        </span>


                    </div>
                    <div className={showClass}>
                        {
                            hisItems
                                ? hisItems.map((item: CatalogItem) => <TreeNode
                                    item={item}
                                    key={"TreeNode"+item.ref}

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