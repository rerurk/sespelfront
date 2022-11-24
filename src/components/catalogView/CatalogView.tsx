import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./CatalogView.module.css"


import {CatalogItem} from "../../structs/catalog";
import CatalogMenu from "../catalogMenu/CatalogMenu";
import {Fetches} from "../../fetches/Fetches";


interface CatalogViewProps {
    item: CatalogItem
    keyVal: number
}

const CatalogView: FC<CatalogViewProps> = ({item, keyVal}) => {

    const [hisItem, setHisItem] = useState<CatalogItem>(item)
    const [showText, setShowText] = useState<string>("+")
    const [showClass, setShowClass] = useState<string>(cl.wrapper__catalog_hidden)
    const [isItemsHidden,setIsItemsHidden]=useState<boolean>(true)

    const onMenuClick = () => {
        console.log("MENU:", hisItem)
        let res=window.prompt("Чаво")
        if (res){
            console.log(res)
            let newItem:CatalogItem={
                description: "",
                id: 0,
                image: "",
                is_table: false,
                items: null,
                name: res,
                ref: ""
            }
        }
    }
    const onShowClick = () => {
        if (isItemsHidden){
            setShowClass(cl.wrapper__catalog_show)
            setShowText("-")

        }else {
            setShowClass(cl.wrapper__catalog_hidden)
            setShowText("+")
        }
        setIsItemsHidden(()=>!isItemsHidden)
        if (hisItem.items) {

        } else {
            Fetches.GetCatalogItems(hisItem).then(items => {
                 console.log(items)
                if (items instanceof Error) {
                    alert("Что то пошло не так.... :(")
                } else {
                    if(items) {
                        hisItem.items = items
                        setHisItem({...hisItem})
                    }else {
                        setShowText("+")
                        alert(` Каталог ${hisItem.name} пустой`)
                    }
                }

            })
        }


    }

    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
            {hisItem.is_table
                ? <div className={cl.wrapper__name_table}>
                    <div className={cl.wrapper___catalog_name}>
                        <CatalogMenu onMenuClick={() => onMenuClick()}/>
                        <span>{hisItem.name}</span>
                        <div className={cl.wrapper_showCatalog} onClick={onShowClick}>{showText}</div>

                    </div>
                    <div className={showClass}>
                    {
                        hisItem.items
                            ? hisItem.items.map((item: CatalogItem, ind: number) => <CatalogView
                                item={item} keyVal={keyVal + 1}
                                key={"cv_" + keyVal + ind}/>)
                            : false
                    }
                    </div>

                </div>
                : <div className={cl.wrapper__name_end_point}>{hisItem.name}</div>

            }
        </div>
    );
};

export default CatalogView;