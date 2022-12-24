import React from 'react';
// @ts-ignore
import cl from "./CreateAssetsStore.module.css"
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import {RouterPath} from "../../router";
import {CreateStoreGropeTexts} from "../createStoreGrope/CreateStoreGropeTexts";
import {AddToItem, Item} from "../../structs/App";
import {AppItemTYPES} from "../../App";
import {StoreItem} from "../../structs/StoreAssets";
let newStoreItem: Item = {
    id: -1,
    name: "",
    owner_uuid:"",
    type:-2,
    uuid: ""

}
const CreateAssetsStore = () => {

    const navigate=useNavigate();
    const {selectedStoreGroup,selectedStore} = useTypeSelector(state => state.appReducer)

    const onInputChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        newStoreItem.name=e.currentTarget.value
    }

    const onCreateBtClick=()=>{
        if (selectedStoreGroup||selectedStore) {
            newStoreItem.type=AppItemTYPES.ASSETS_STORE_TYPE
            let to_add_item:StoreItem|null=null
            if(selectedStoreGroup){
                to_add_item=selectedStoreGroup
            }
            if(selectedStore){
                to_add_item=selectedStore
            }
            console.log(to_add_item)
            if (to_add_item) {
                let addToItem: AddToItem = {
                    adding_item: newStoreItem,
                    to_add_item: Tools.unRefCatalogItem(to_add_item)

                }
                Fetches.MakeItem(addToItem).then(r => {
                    if (!(r instanceof Error)) {
                        navigate(RouterPath.ASSETS_STORAGE)

                    }
                })
            }

        }
    }
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_fields}>
                <label>{CreateStoreGropeTexts.GROUP_LABEL.text}:</label>
                <label>{selectedStoreGroup?selectedStoreGroup.name:selectedStore?.name}</label>
                <label>{CreateStoreGropeTexts.SUB_GROUP_LABEL.text} </label>
                <input defaultValue={""} key={"MakeStore_input"} onInput={onInputChange}/>
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

export default CreateAssetsStore;