import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {AppItemMasks} from "../../App";
import {AddToItem} from "../../structs/nomenclature";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
// @ts-ignore
import cl from "./MakeNomenclatureItem.module.css"
import {Item} from "../../structs/App";
let newGroup:Item ={
    id: -1,
    type: 0,
    name: "",
    owner_uuid: "",
    uuid: ""

}
const MakeNomenclatureItem: FC = () => {
    newGroup={
        id: -1,
        type: AppItemMasks.NOMENCLATURE_ITEM_TYPE,
        name: "",
        owner_uuid: "",
        uuid: ""

    }
    const navigate = useNavigate();
    const {selectedNomenclatureGroup} = useTypeSelector(state => state.appReducer)
    const onBtSaveClick=()=>{
        if(selectedNomenclatureGroup){
            let addToItem:AddToItem={
                adding_item:newGroup,
                to_add_item:Tools.unRefCatalogItem(selectedNomenclatureGroup)

            }

            Fetches.MakeNomenclatureItem(addToItem).then(r=>{
                console.log(r)
                if(!(r instanceof Error) &&selectedNomenclatureGroup.callReBoot){
                    navigate(RouterPath.NOMENCLATURE)
                    selectedNomenclatureGroup.callReBoot()

                }
            })
        }

    }
    const onInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        newGroup.name=e.target.value

    }
    return (
        <div className={cl.wrapper}>
            <div>
                <label>Называние: </label>
                <input defaultValue={""} key={"MakeNomenclatureITEM_input"} onInput={onInputChange}/>
            </div>
            <div className={cl.wrapper_bts}>
                <button onClick={() => navigate(RouterPath.NOMENCLATURE)}>ОТМЕНА</button>
                <button onClick={onBtSaveClick}>СОХРАНИТЬ</button>
            </div>
        </div>
    );
};
export default MakeNomenclatureItem;