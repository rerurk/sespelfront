import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./TreeNode.module.css"


import {CatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


import {Masks} from "../../masks/Masks";
import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";
import {useDispatch} from "react-redux";
import {CatalogAndItems, ShowCatalogState} from "../../store/types/showCatalog";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";



interface CatalogViewProps {

    item: CatalogItem

}

const showS="v"
const hiddenS=">"

const TreeNode: FC<CatalogViewProps> = ({ item}) => {

    const [hisItems, setHisItems] = useState<CatalogItem[]|null>(null)
    const [showText, setShowText] = useState<string>(hiddenS)
    const [showClass, setShowClass] = useState<string>(cl.wrapper__catalog_hidden)
    const [isItemsHidden, setIsItemsHidden] = useState<boolean>(true)
    const dispatch=useDispatch()

    const onCatalogNameClick=()=>{
       let ci:CatalogAndItems={
           items:hisItems,
           item:item
       }


        // @ts-ignore
        dispatch(SetCurrentCatalogState(ci))

    }

    const onShowClick = () => {

        if (isItemsHidden) {
            console.log("const onShowClick")
            setShowClass(cl.wrapper__catalog_show)
            setShowText(showS)

            Fetches.GetCatalogItems(item).then(items => {
               console.log(" const onShowClick items",items)
                if (!(items instanceof Error) && items &&items.length>0){

                    items.map((it:CatalogItem)=>{it.parent=item})

                    setHisItems(()=>(items))
                }

            })

        } else {
            setShowClass(cl.wrapper__catalog_hidden)
            setShowText(hiddenS)
        }
        setIsItemsHidden(() => !isItemsHidden)


    }

    const onDragEnterToItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.add(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(item)
    }

    const onDragLeaveFromItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.remove(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(item)
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
                         onDragEnd={ConfirmReplace}
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
                                    key={"TreeNode"+item.ref}/>)
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