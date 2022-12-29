import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./ModifyNomenclatureGroup.module.css"
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {ExtendedItem, Item, RenameItem, RenameNomenclatureItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";
import {AppItemTYPES} from "../../App";
import {Domen} from "../../fetches/Requests";
import ImageRedactor, {GetImage} from "../../components/imageRedactor/ImageRedactor";


let newItem: Item = {
    id: 0,
    name: "",
    owner_uuid: "",
    type: 0,
    uuid: ""
}
const ModifyNomenclatureGroup: FC = () => {
    const navigate = useNavigate();
    const {selectedNomenclatureGroup, selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)
    const [modifyItem, setModifyItem] = useState<ExtendedItem | null>(selectedNomenclatureItem ? selectedNomenclatureItem : selectedNomenclatureGroup)
    const [showIMG, setShowIMG] = useState<boolean>(false)
    useEffect(() => {
        if (selectedNomenclatureItem && (selectedNomenclatureItem.type & AppItemTYPES.NOMENCLATURE_ITEM_TYPE_HAS_IMG) === AppItemTYPES.NOMENCLATURE_ITEM_TYPE_HAS_IMG) {
            setShowIMG(() => true)
        }

    })


    const onSaveClick = () => {
        if (modifyItem) {
            if(!GetImage()) {
                let renameItem: RenameItem = {
                    new_item: newItem,
                    renamed_item: Tools.unRefCatalogItem(modifyItem)
                }
                Fetches.ModifyItem(renameItem).then(r => {
                    navigate(RouterPath.NOMENCLATURE)
                })
            }
            if(GetImage()){

                let  renameItem:RenameNomenclatureItem={
                    new_item: newItem,
                    renamed_item: Tools.unRefCatalogItem(modifyItem),
                    new_img:GetImage()
                }
                console.log(renameItem)
                Fetches.ModifyNomenclatureItem(renameItem).then(r=>{  navigate(RouterPath.NOMENCLATURE)})
            }
        }
    }
    const onRemoveClick = () => {
        if (modifyItem) {
            Fetches.RemoveItem(Tools.unRefCatalogItem(modifyItem)).then(r => {
                navigate(RouterPath.NOMENCLATURE)
            })
        }
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        newItem.name = e.target.value

    }
    if (modifyItem) {
        return (
            <div className={cl.wrapper}>
                <div className={cl.wrapper_fields}>
                    <label>Группа:{selectedNomenclatureGroup?.name}</label>
                    <label>Новое наименование: </label>
                    <input onChange={e => onInputChange(e)} defaultValue={modifyItem?.name}
                           key={"ModifyNomenclatureGroup_input"}/>
                </div>
                <div className={cl.wrapper_bts}>
                    <button onClick={() => navigate(RouterPath.NOMENCLATURE)}>ОТМЕНА</button>
                    <button onClick={onSaveClick}>СОХРАНИТЬ</button>
                    <button onClick={onRemoveClick}>удалить</button>
                </div>
                {showIMG
                    ?<img src={Domen+"/images/items_img/"+selectedNomenclatureItem?.uuid+".jpg"}/>
                    :<ImageRedactor/>
                }
            </div>
        );
    }
    return (<div/>)
};

export default ModifyNomenclatureGroup;