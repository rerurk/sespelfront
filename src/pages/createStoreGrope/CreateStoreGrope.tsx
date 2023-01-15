import React, {FC} from 'react';
// @ts-ignore
import cl from "./CreateStoreGrope.module.css"
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {CreateStoreGropeTexts} from "./CreateStoreGropeTexts";

import {AddToItem, Item} from "../../structs/App";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Tools} from "../../tools/Tools";
import {AppItemTYPES} from "../../App";
import {Fetches} from "../../fetches/Fetches";

let newStoreItem: Item = {
    id: -1,
    name: "",
    owner_uuid:"",
    type:-2,
    uuid: ""

}

const CreateStoreGrope:FC = () => {
    const navigate=useNavigate();

    const {selectedStoreGroup} = useTypeSelector(state => state.appReducer)

    const onInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        newStoreItem.name=e.currentTarget.value
    }

    const onCreateBtClick=()=>{
        if (selectedStoreGroup) {
             newStoreItem.type=AppItemTYPES.STORE_GROPE_TYPE|AppItemTYPES.STORE_TYPE
            let addToItem: AddToItem = {
                adding_item: newStoreItem,
                to_add_item: Tools.unRefCatalogItem(selectedStoreGroup)

            }
            Fetches.MakeItem(addToItem).then(r=>{
                if (!(r instanceof Error)){
                    navigate(RouterPath.ASSETS_STORAGE)
                    if(selectedStoreGroup.callReBoot) {
                        selectedStoreGroup.callReBoot()
                    }
                }
            })


        }
    }
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_fields}>
                <label>{CreateStoreGropeTexts.GROUP_LABEL.text}:{selectedStoreGroup?.name}</label>
                <label>{CreateStoreGropeTexts.SUB_GROUP_LABEL.text} </label>
                <input defaultValue={""} key={"MakeNomenclatureGroup_input"} onInput={onInputChange}/>
            </div>
            <div className={cl.wrapper_bts}>
                <button onClick={() => navigate(RouterPath.ASSETS_STORAGE)}
                        title={CreateStoreGropeTexts.BT_CANCEL.title}>{CreateStoreGropeTexts.BT_CANCEL.text}</button>
                <button onClick={()=>onCreateBtClick()}
                        title={CreateStoreGropeTexts.BT_MAKE.title}>{CreateStoreGropeTexts.BT_MAKE.text}</button>

            </div>
        </div>
    );
};

export default CreateStoreGrope;