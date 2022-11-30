import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./CatalogView.module.css"


import {CatalogItem} from "../../structs/catalog";
import {Fetches} from "../../fetches/Fetches";


import {Masks} from "../../masks/Masks";
import {ConfirmReplace, onItemDrag, OnItemDragEnter} from "../../gragAndDrops/catalog/catalog";
import {useDispatch} from "react-redux";
import {ShowCatalogState} from "../../store/types/showCatalog";
import {SetCurrentCatalogState} from "../../store/action_creator/showCatalogNode";



interface CatalogViewProps {

    item: CatalogItem

}

const showS="v"
const hiddenS=">"

const CatalogView: FC<CatalogViewProps> = ({ item}) => {

    const [hisItem, setHisItem] = useState<CatalogItem>(item)
    const [showText, setShowText] = useState<string>(hiddenS)
    const [showClass, setShowClass] = useState<string>(cl.wrapper__catalog_hidden)
    const [isItemsHidden, setIsItemsHidden] = useState<boolean>(true)
    const dispatch=useDispatch()

    const onCatalogNameClick=()=>{

         // @ts-ignore
        dispatch(SetCurrentCatalogState(hisItem))

    }

    const onShowClick = () => {
        if (isItemsHidden) {
            setShowClass(cl.wrapper__catalog_show)
            setShowText(showS)
            console.log(hisItem)
            Fetches.GetCatalogItems(hisItem).then(items => {
                console.log(items)
                if (!(items instanceof Error) && items.length>0){

                    items.map((it:CatalogItem)=>{it.parent=item})
                    setHisItem(()=>({...hisItem,items:items}))
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
        OnItemDragEnter(hisItem)
    }

    const onDragLeaveFromItem = (e: React.MouseEvent<HTMLDivElement>) => {

        e.currentTarget.classList.remove(cl.wrapper___catalog_name_onDragEnter)
        OnItemDragEnter(hisItem)
    }


    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()} draggable={false}>
            {((hisItem.mask & Masks.CATALOG_MASK)==Masks.CATALOG_MASK)
                ? <div className={cl.wrapper__name_table}>
                    <div className={cl.wrapper___catalog_name}
                         draggable={true}
                         onDrag={() => onItemDrag(hisItem)}
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
                            {hisItem.name}
                        </span>


                    </div>
                    <div className={showClass}>
                        {
                            hisItem.items
                                ? hisItem.items.map((item: CatalogItem) => <CatalogView
                                    item={item}
                                    key={"CatalogView"+item.ref}/>)
                                : false
                        }
                    </div>

                </div>
                : false


            }
        </div>
    );
};

export default CatalogView;