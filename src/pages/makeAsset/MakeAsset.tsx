import React, {FC, useEffect, useState} from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
// @ts-ignore
import cl from "./MakeAsset.module.css"
import NomenclatureItemView from "../../components/nomenclatureItemsShow/NomenclatureItemView";
import StoreTree from "../../components/stores/storeTree/StoreTree";

import {TMakeNewAsset} from "../../structs/Asset";
import {Tools} from "../../tools/Tools";
import {Fetches} from "../../fetches/Fetches";
import TestItems, {TestFields} from "../../testItems/TestItems";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";


let newAsset: TMakeNewAsset = {
    asset_nomenclature_item: null,
    asset_store: null,
    init_fields: {
        owner: "",
        serial_number: null,
        uuid: ""
    }

}


const MakeAsset: FC = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const {storeGroupRoot, nomenclatureRoot, selectedStore, selectedNomenclatureItem} = useTypeSelector(state => state.appReducer)
    const [serialNumber, setSerialNumber] = useState<string>("")
    const [showSerialInput, setShowSerialInput] = useState<boolean>(false)
    const [testNewAsset,setTestNewAsset]=useState<TestFields>({IsOk: false, Msg: ""})

    useEffect(()=>{
        newAsset.asset_nomenclature_item=selectedNomenclatureItem
        newAsset.asset_store=selectedStore
        setTestNewAsset(()=>TestItems.TestNewAsset(newAsset))

    },[selectedStore,selectedNomenclatureItem])

    const onMakeClick = () => {
        if (selectedStore && selectedNomenclatureItem) {

            let conf = window.confirm(` Содать ТМЦ ${selectedNomenclatureItem.name} в ${selectedStore.name}?`)
            if (conf) {
                newAsset.asset_store = Tools.unRefCatalogItem(selectedStore)
                newAsset.asset_nomenclature_item = Tools.unRefCatalogItem(selectedNomenclatureItem)


                if (testNewAsset.IsOk) {

                    Fetches.MakeAsset(newAsset).then(r => {
                        if (!(r instanceof Error)) {
                            newAsset = {
                                asset_nomenclature_item: null,
                                asset_store: null,
                                init_fields: {
                                    owner: "",
                                    serial_number: null,
                                    uuid: ""
                                }

                            }
                            // @ts-ignore
                            dispatch(SetSelectedAssetState(r))
                            navigate(RouterPath.QR_SCAN_RESULT)
                        }
                    })
                } else {
                    alert(testNewAsset.Msg)
                }

            }
        }
    }

    const onChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.checked) {
            setSerialNumber(() => "")
            setShowSerialInput(() => true)
            newAsset.init_fields.serial_number = ""
            setTestNewAsset(()=>TestItems.TestNewAsset(newAsset))

        } else {
            newAsset.init_fields.serial_number = null
            setShowSerialInput(() => false)
            setTestNewAsset(()=>TestItems.TestNewAsset(newAsset))

        }

    };

    const onSerialNumberEnter = (e: React.ChangeEvent<HTMLInputElement>) => {
        newAsset.init_fields.serial_number=e.target.value
        setTestNewAsset(()=>TestItems.TestNewAsset(newAsset))


    }
    if (storeGroupRoot && nomenclatureRoot)
        return (

            <div className={cl.wrapper}>
                <div className={cl.wrapper_fieldsWrapper}>
                    <div className={cl.wrapper_fieldsWrapper_field}>
                        <div className={cl.wrapper_fieldsWrapper_field_label}><label>Склад:</label></div>
                        <div className={cl.wrapper_fieldsWrapper_field_item}>
                            <span>{selectedStore ? selectedStore.name : ""}</span></div>
                    </div>
                    <div className={cl.wrapper_fieldsWrapper_field}>
                        <div className={cl.wrapper_fieldsWrapper_field_label}><label>Наименование:</label></div>
                        <div className={cl.wrapper_fieldsWrapper_field_item}>
                            <span>{selectedNomenclatureItem ? selectedNomenclatureItem.name : false}</span></div>
                    </div>
                    {
                        showSerialInput
                            ? <div className={cl.wrapper_fieldsWrapper_field}>
                                <div className={cl.wrapper_fieldsWrapper_field_label}><label>S/N:</label></div>
                                <div className={cl.wrapper_fieldsWrapper_field_item}>
                                    <input
                                        height={"2rem"}
                                        key={"MakeAsset_serialNum"}
                                        defaultValue={serialNumber}
                                        onChange={e => onSerialNumberEnter(e)}
                                    />
                                </div>
                            </div>
                            : false
                    }
                    <div className={cl.wrapper_fieldsWrapper_setSerial}>
                        <span> указать серийный номер</span>
                        <input key={"MakeAssety_setSerNum"}
                               type="checkbox"
                               onChange={event => onChangeCheck(event)}/>

                    </div>
                    {testNewAsset.IsOk
                        ? <button onClick={onMakeClick}>СОЗДАТЬ</button>
                        : false
                    }

                </div>
                <div className={cl.wrapper_makeAsset}>


                </div>
                <div className={cl.wrapper_selectStoreAngNomenclature} onClick={event => event.stopPropagation()}>
                    <div className={cl.wrapper_selectStoreAngNomenclature_itemName}>
                        <span>Номенклатура</span>
                    </div>
                    <NomenclatureItemView item={nomenclatureRoot}/>
                    <div className={cl.wrapper_selectStoreAngNomenclature_itemName}>
                        <span>Склад</span>
                    </div>
                    <StoreTree item={storeGroupRoot}/>

                </div>

            </div>
        );
    return (<div/>)
};

export default MakeAsset;