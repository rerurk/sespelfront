import React, {FC, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeAsset.module.css"
import NomenclatureItemView from "../../components/nomenclatureItemsShow/NomenclatureItemView";
import StoreTree from "../../components/stores/storeTree/StoreTree";

import {TMakeNewAsset} from "../../structs/Asset";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import TestItems, {TestFields} from "../../testItems/TestItems";



let newAsset: TMakeNewAsset = {
    asset_nomenclature_item: null,
    asset_store: null,
    init_fields:{
        owner: "",
        serial_number: null,
        uuid: ""
    }

}


const MakeAsset: FC = () => {
    const {storeGroupRoot, nomenclatureRoot, selectedStore, selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)
    const [serialNumber,setSerialNumber]=useState<string>("")
    const [showSerialInput,setShowSerialInput]=useState<boolean>(false)
    const onMakeClick = () => {
        if (selectedStore && selectedNomenclatureItem) {

            let conf = window.confirm(` Содать ТМЦ ${selectedNomenclatureItem.name} в ${selectedStore.name}?`)
            if (conf) {
                newAsset.asset_store = Tools.unRefCatalogItem(selectedStore)
                newAsset.asset_nomenclature_item = Tools.unRefCatalogItem(selectedNomenclatureItem)
                if(showSerialInput){
                    newAsset.init_fields.serial_number=serialNumber
                }
                let testNewAsset:TestFields=TestItems.TestNewAsset(newAsset)
                if (testNewAsset.IsOk) {
                    Fetches.MakeAsset(newAsset).then(r => {
                        if (!(r instanceof Error)) {

                        }
                    })
                }else {
                    alert(testNewAsset.Msg)
                }

            }
        }
    }

    const onChangeCheck = (e:React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.checked){
            setSerialNumber(()=>"")
            setShowSerialInput(()=>true)
            newAsset.init_fields.serial_number=""

        }else {
            newAsset.init_fields.serial_number=null
            setShowSerialInput(()=>false)

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
                    {selectedStore && selectedNomenclatureItem
                        ?<button onClick={onMakeClick}>СОЗДАТЬ</button>
                        :false
                    }
                        <div>
                        <span> указать серийный номер</span>
                        <input  key={"MakeAssety_setSerNum"}
                                type="checkbox"

                                onChange={event => onChangeCheck(event)}/>
                        {
                            showSerialInput
                                ?<div className={cl.wrapper_makeAsset_setSerial_serial}>
                                    <input
                                        height={"2rem"}
                                        key={"MakeAsset_serialNum"}

                                        defaultValue={serialNumber}
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