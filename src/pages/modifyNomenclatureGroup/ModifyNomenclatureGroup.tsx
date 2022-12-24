import React, {FC} from 'react';
// @ts-ignore
import cl from "./ModifyNomenclatureGroup.module.css"
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {Item, RenameItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";


let newItem:Item={
    id: 0,
    name: "",
    owner_uuid:"",
    type: 0,
    uuid: ""
}
const ModifyNomenclatureGroup: FC = () => {
    const navigate = useNavigate();
    const {selectedNomenclatureGroup} = useTypeSelector(state => state.appReducer)
    const onSaveClick = () => {
        if (selectedNomenclatureGroup) {
            newItem.owner_uuid=selectedNomenclatureGroup.owner_uuid
            newItem.type=selectedNomenclatureGroup.type
            newItem.uuid=selectedNomenclatureGroup.uuid
            let renameItem:RenameItem={
                new_item:newItem,
                renamed_item:Tools.unRefCatalogItem(selectedNomenclatureGroup)
            }

            Fetches.ModifyItem(renameItem).then(r => console.log(r))
        }
    }
   const onInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        newItem.name=e.target.value

   }
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_fields}>
                <label>Группа:{selectedNomenclatureGroup?.name}</label>
                <label>Новое наименование: </label>
                <input  onChange={e=>onInputChange(e)} defaultValue={selectedNomenclatureGroup?.name} key={"ModifyNomenclatureGroup_input"}/>
            </div>
            <div className={cl.wrapper_bts}>
                <button onClick={() => navigate(RouterPath.NOMENCLATURE)}>ОТМЕНА</button>
                <button onClick={onSaveClick}>СОХРАНИТЬ</button>
            </div>
        </div>
    );
};

export default ModifyNomenclatureGroup;