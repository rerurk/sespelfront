import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeNomenclatureGroup.module.css"
import {AddToItem, Item} from "../../structs/nomenclature";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import {AppItemMasks} from "../../App";
import {MakeNomenclatureGroupTexts} from "./makeNomenclatureGroupTexts";

let newGroup: Item = {
    id: -1,
    mask: 0,
    name: "",
    owner_uuid: "",
    uuid: ""

}

const MakeNomenclatureGroup: FC = () => {
    newGroup = {
        id: -1,
        mask: AppItemMasks.CATALOG_MASK,
        name: "",
        owner_uuid: "",
        uuid: ""

    }
    const navigate = useNavigate();
    const {selectedNomenclatureGroup} = useTypeSelector(state => state.showCatalogNode)
    const onBtSaveClick = () => {
        if (selectedNomenclatureGroup) {
            let addToItem: AddToItem = {
                adding_item: newGroup,
                to_add_item: Tools.unRefCatalogItem(selectedNomenclatureGroup)

            }

            Fetches.MakeCatalogItem(addToItem).then(r => {

                if (!(r instanceof Error) && selectedNomenclatureGroup.callReBoot) {
                    navigate(RouterPath.NOMENCLATURE)
                    selectedNomenclatureGroup.callReBoot()

                }
            })
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