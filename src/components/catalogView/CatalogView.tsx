import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./CatalogView.module.css"


import {CatalogItem, CatalogNode} from "../../structs/catalog";
import CatalogMenu from "../catalogMenu/CatalogMenu";
import {Fetches} from "../../fetches/Fetches";
import {onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";


interface CatalogViewProps {
    parentItem: CatalogItem|null
    item: CatalogItem
    keyVal: number
}

const CatalogView: FC<CatalogViewProps> = ({parentItem, item, keyVal}) => {

    const [hisItem, setHisItem] = useState<CatalogItem>(item)
    const [showText, setShowText] = useState<string>("+")
    const [showClass, setShowClass] = useState<string>(cl.wrapper__catalog_hidden)
    const [isItemsHidden, setIsItemsHidden] = useState<boolean>(true)


    const onShowClick = () => {
        if (isItemsHidden) {
            setShowClass(cl.wrapper__catalog_show)
            setShowText("-")

        } else {
            setShowClass(cl.wrapper__catalog_hidden)
            setShowText("+")
        }
        setIsItemsHidden(() => !isItemsHidden)
        if (hisItem.items) {

        } else {
            Fetches.GetCatalogItems(hisItem).then(items => {
                console.log(items)
                if (items instanceof Error) {
                    alert("Что то пошло не так.... :(")
                } else {
                    if (items) {
                        hisItem.items = items
                        setHisItem({...hisItem})
                    } else {
                        setShowText("+")
                        alert(` Каталог ${hisItem.name} пустой`)
                    }
                }

            })
        }


    }

    const onDragEnterToItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.add(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(hisItem)
    }
    const onDragLeaveFromItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.remove(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(hisItem)
    }


    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()} draggable={false}>
            {hisItem.is_table
                ? <div className={cl.wrapper__name_table}>
                    <div className={cl.wrapper___catalog_name}
                         draggable={true}
                         onDrag={() => onItemDrag(hisItem, parentItem)}
                         onDragEnter={(e) => onDragEnterToItem(e)}
                         onDragLeave={e => onDragLeaveFromItem(e)}
                    >
                        <CatalogMenu catalogNode={{parent:parentItem,self:hisItem}}/>
                        <span
                        >
                            {hisItem.name}
                        </span>
                        <div
                            className={cl.wrapper_showCatalog}
                            onClick={onShowClick}>
                            {showText}
                        </div>

                    </div>
                    <div className={showClass}>
                        {
                            hisItem.items
                                ? hisItem.items.map((item: CatalogItem, ind: number) => <CatalogView
                                    parentItem={hisItem}
                                    item={item} keyVal={keyVal + 1}
                                    key={"cv_" + keyVal + ind}/>)
                                : false
                        }
                    </div>

                </div>
                : <div
                    className={cl.wrapper__name_end_point}
                    draggable={true}
                    onDrag={() => onItemDrag(hisItem, parentItem)}
                    onDragEnter={() => OnItemDragEnter(hisItem)}
                >
                    {hisItem.name}
                </div>

            }
        </div>
    );
};

export default CatalogView;