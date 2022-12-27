import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeNomenclatureGroup.module.css"

import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import {AppItemTYPES} from "../../App";
import {MakeNomenclatureGroupTexts} from "./makeNomenclatureGroupTexts";
import {AddToItem, Item} from "../../structs/App";

let newGroup: Item = {
    id: -1,
    type: 0,
    name: "",
    owner_uuid: "",
    uuid: ""

}

const MakeNomenclatureGroup: FC = () => {
    newGroup= {
        id: -1,
        type: AppItemTYPES.NOMENCLATURE_GROUP_TYPE|AppItemTYPES.NOMENCLATURE_TYPE,
        name: "",
        owner_uuid: "",
        uuid: ""

    }
    const navigate = useNavigate();
    const {selectedNomenclatureGroup} = useTypeSelector(state => state.appReducer)
    const onBtSaveClick = () => {
        if (selectedNomenclatureGroup) {
            let conf: boolean = window.confirm(`Добавить ${newGroup.name} в ${selectedNomenclatureGroup.name}?`)
            if (conf) {
                let addToItem: AddToItem = {
                    adding_item: newGroup,
                    to_add_item: Tools.unRefCatalogItem(selectedNomenclatureGroup)

                }

                Fetches.MakeItem(addToItem).then(r => {

                    if (!(r instanceof Error) && selectedNomenclatureGroup.callReBoot) {
                        navigate(RouterPath.NOMENCLATURE)
                        selectedNomenclatureGroup.callReBoot()

                    }
                })
            }
        }

    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        newGroup.name = e.target.value

    }
    return (
        <div className={cl.wrapper}>

                <div className={cl.wrapper_fields}>
                    <label>{MakeNomenclatureGroupTexts.GROUP_LABEL.text}:{selectedNomenclatureGroup?.name}</label>
                    <label>{MakeNomenclatureGroupTexts.SUB_GROUP_LABEL.text} </label>
                    <input defaultValue={""} key={"MakeNomenclatureGroup_input"} onInput={onInputChange}/>
                </div>
                <div className={cl.wrapper_bts}>
                    <button onClick={() => navigate(RouterPath.NOMENCLATURE)}
                            title={MakeNomenclatureGroupTexts.BT_CANCEL.title}>{MakeNomenclatureGroupTexts.BT_CANCEL.text}</button>
                    <button onClick={onBtSaveClick}
                            title={MakeNomenclatureGroupTexts.BT_MAKE.title}>{MakeNomenclatureGroupTexts.BT_MAKE.text}</button>

            </div>
        </div>
    );
};

export default MakeNomenclatureGroup;