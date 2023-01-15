import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {AppItemTYPES} from "../../App";

import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
// @ts-ignore
import cl from "./MakeNomenclatureItem.module.css"
import {AddNomenclatureItem, AddToItem, Item} from "../../structs/App";
import ImageRedactor, {GetImage} from "../../components/imageRedactor/ImageRedactor";
let newItem:Item ={
    id: -1,
    type: 0,
    name: "",
    owner_uuid: "",
    uuid: ""

}
const MakeNomenclatureItem: FC = () => {
    newItem={
        id: -1,
        type: AppItemTYPES.NOMENCLATURE_ITEM_TYPE|AppItemTYPES.NOMENCLATURE_TYPE,
        name: "",
        owner_uuid: "",
        uuid: ""

    }
    const navigate = useNavigate();
    const {selectedNomenclatureGroup} = useTypeSelector(state => state.appReducer)
    const onBtSaveClick=()=>{
        console.log(GetImage())

        if(selectedNomenclatureGroup) {
            let conf: boolean = window.confirm(`Добавить ${newItem.name} в ${selectedNomenclatureGroup.name}?`)
            if (conf)
            {
                let addToItem: AddNomenclatureItem = {
                    adding_item: newItem,
                    to_add_item: Tools.unRefCatalogItem(selectedNomenclatureGroup),
                    item_img:GetImage()


                }
               console.log(addToItem)
                Fetches.MakeNomenclatureItem(addToItem).then(r => {

                    if (!(r instanceof Error) && selectedNomenclatureGroup.callReBoot) {
                        navigate(RouterPath.NOMENCLATURE)
                        selectedNomenclatureGroup.callReBoot()

                    }
                })
            }
        }

    }
    const onInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        newItem.name=e.target.value

    }
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_fields}>
                <label>Называние: </label>
                <input defaultValue={""} key={"MakeNomenclatureITEM_input"} onInput={onInputChange}/>
            </div>
            <div className={cl.wrapper_bts}>
                <button onClick={() => navigate(RouterPath.NOMENCLATURE)}>ОТМЕНА</button>
                <button onClick={onBtSaveClick}>СОХРАНИТЬ</button>
            </div>
            <ImageRedactor/>
        </div>
    );
};
export default MakeNomenclatureItem;