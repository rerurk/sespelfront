import React, {FC, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeAsset.module.css"
import NomenclatureItemView from "../../components/nomenclatureItemsShow/NomenclatureItemView";
import StoreTree from "../../components/stores/storeTree/StoreTree";

import {QrCodeFields, TInitAssetsFields, TMakeNewAsset} from "../../structs/Asset";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import {IsQrCodeContainsInState} from "../../store/reducers/appReducer";
import {AddQrCodeToState, RemoveQrCodeFromState} from "../../store/action_creator/AppStoreActions";


let newAsset: TMakeNewAsset = {
    asset_nomenclature_item: null,
    asset_store: null,
    init_fields:{
        owner: "",
        serial_number: "",
        uuid: ""
    }

}


const MakeAsset: FC = () => {
    const {storeGroupRoot, nomenclatureRoot, selectedStore, selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)
    const [serialNumber,setSerialNumber]=useState<string|null>(null)
    const onMakeClick = () => {
        if (selectedStore && selectedNomenclatureItem) {

            let conf = window.confirm(` Содать ТМЦ ${selectedNomenclatureItem.name} в ${selectedStore.name}?`)
            if (conf) {
                newAsset.asset_store = Tools.unRefCatalogItem(selectedStore)
                newAsset.asset_nomenclature_item = Tools.unRefCatalogItem(selectedNomenclatureItem)
                if(serialNumber&&serialNumber.length>2){

                    newAsset.init_fields.serial_number=serialNumber
                }
                console.log(newAsset)
                Fetches.MakeAsset(newAsset).then(r => {
                    if (!(r instanceof Error)) {

                    }
                })
            }
        }
    }

    const onChangeCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
       console.log(e.target)
        if(e.target.checked){
          setSerialNumber(()=>"_")
        }else {
          setSerialNumber(()=>null)
        }

    };

    const onSerialNumberEnter=(e:React.ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value)
        setSerialNumber(()=>e.target.value)


    }
    if (storeGroupRoot && nomenclatureRoot)
        return (

            <div className={cl.wrapper}>
                <div className={cl.wrapper_selectedStoreAngNomenclature}>
                    <div>
                        <label>Склад:</label><span>{selectedStore ? selectedStore.name : ""}</span>
                    </div>
                    <div>
                        <label>Наименование:</label><span>{selectedNomenclatureItem ? selectedNomenclatureItem.name : false}</span>
                    </div>
                </div>
                <div className={cl.wrapper_makeAsset}>
                    <button onClick={onMakeClick}>СОЗДАТЬ</button>
                    <div>
                        <span> указать серийный номер</span>
                        <input  key={"MakeAssety_setSerNum"}
                                type="checkbox"

                                onChange={event => onChangeCheck(event)}/>
                        {
                            serialNumber
                                ?<div>
                                    <input
                                        key={"MakeAsset_serialNum"}
                                        defaultValue={serialNumber?serialNumber:""}
                                        onChange={e=>onSerialNumberEnter(e)}
                                    />
                            </div>
                                :false
                        }
                    </div>
                </div>
                <div className={cl.wrapper_selectStoreAngNomenclature}>
                    <NomenclatureItemView item={nomenclatureRoot}/>
                    <StoreTree item={storeGroupRoot}/>
                </div>

            </div>
        );
    return (<div/>)
};

export default MakeAsset;