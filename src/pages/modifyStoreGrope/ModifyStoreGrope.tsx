import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {ExtendedItem, Item, RenameItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import {RouterPath} from "../../router";

// @ts-ignore
import cl from "./ModifyStoreGrope.module.css"

let newItem: Item = {
    id: 0,
    name: "",
    owner_uuid: "",
    type: 0,
    uuid: ""
}

const ModifyStoreGrope = () => {

    const navigate = useNavigate();
    const {selectedStoreGroup,selectedStore} = useTypeSelector(state => state.appReducer)

    const [modifyItem, setModifyItem] = useState<ExtendedItem | null>(selectedStoreGroup ? selectedStoreGroup : selectedStore)


    const onSaveClick = () => {
        if (modifyItem) {

            let renameItem: RenameItem = {
                new_item: newItem,
                renamed_item: Tools.unRefCatalogItem(modifyItem)
            }

            Fetches.ModifyItem(renameItem).then(r => {
                navigate(RouterPath.ASSETS_STORAGE)
            })
        }
    }
    const onRemoveClick=()=>{
        if (modifyItem){
            Fetches.RemoveItem(Tools.unRefCatalogItem(modifyItem)).then(r=>{
                navigate(RouterPath.ASSETS_STORAGE)
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
                    <label>Группа:{modifyItem?.name}</label>
                    <label>Новое наименование: </label>
                    <input onChange={e => onInputChange(e)} defaultValue={modifyItem?.name}
                           key={"ModifyNomenclatureGroup_input"}/>
                </div>
                <div className={cl.wrapper_bts}>
                    <button onClick={() => navigate(RouterPath.NOMENCLATURE)}>ОТМЕНА</button>
                    <button onClick={onSaveClick}>СОХРАНИТЬ</button>
                    <button onClick={onRemoveClick}>удалить</button>
                </div>
            </div>
        );
    }
    return (<div/>)
};

export default ModifyStoreGrope;