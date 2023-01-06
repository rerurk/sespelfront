import React, {useEffect, useState} from 'react';
// @ts-ignore
import cl from "./QrScanResult.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";

import {useDispatch} from "react-redux";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import StoreTree from "../../components/stores/storeTree/StoreTree";
import {Fetches} from "../../fetches/Fetches";
import {TransferItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";
import {TAsset} from "../../structs/Asset";
import {Domen} from "../../fetches/Requests";
import AssetTransferHistory from "../../components/assetTransferHistory/AssetTransferHistory";

import AssetQRCode from "../../components/assetQRCodeView/AssetQRCode";
import BtImg from "../../components/UI/btImg/BtImg";
import CloseBt from "../../components/UI/closeBt/CloseBt";

const QrScanResult = () => {
    const {selectedAsset, storeGroupRoot, selectedStore} = useTypeSelector(state => state.appReducer)
    useEffect(() => {
        if (selectedStore?.uuid === selectedAsset?.store.uuid && isShowStores) {
            alert(`"${selectedAsset?.nomenclature.name}" уже на складе ` + `"${selectedStore?.name}".`)
        }
    }, [selectedStore])

    const dispatch = useDispatch()

    const [isShowStores, setIsShowStores] = useState<boolean>(false)
    const [isShowTransferHistory, setIsShowTransferHistory] = useState<boolean>(false)


    const onBtMakeTransferClick = () => {
        setIsShowStores(() => !isShowStores)
    }
    const onBtTransferClick = () => {
        if (selectedAsset && selectedStore && selectedAsset.store.uuid != selectedStore?.uuid) {
            let transfer: TransferItem = {
                item: selectedAsset.asset,
                from: selectedAsset.store,
                to: Tools.unRefCatalogItem(selectedStore)
            }
            Fetches.TransferItem(transfer).then(r => {
                if (!(r instanceof Error)) {
                    Fetches.GetAssetBySTRUUID({uuid: selectedAsset.asset.uuid}).then(r => {
                        let as: TAsset | Error = r
                        if (!(as instanceof Error)) {
                            // @ts-ignore
                            dispatch(SetSelectedAssetState(as))
                            setIsShowStores(()=>false)
                        }
                    })

                }
            })
        }
    }
    const onBtShowTransferHistoryClick=()=>{
        setIsShowTransferHistory(()=>!isShowTransferHistory)
    }



    if (selectedAsset && storeGroupRoot) {
        return (
            <div className={cl.wrapper}>

                {isShowTransferHistory
                    ?
                        <AssetTransferHistory onClickBack={onBtShowTransferHistoryClick}/>
                    :false
                }
                {
                    isShowStores
                        ? <div className={cl.wrapper_showStores}>
                            <CloseBt close={()=>setIsShowStores(false)}/>
                            <button onClick={onBtTransferClick}>переместить в {selectedStore?.name}</button>
                            <StoreTree item={storeGroupRoot}/>

                        </div>
                        : false
                }
                <div className={cl.wrapper_tools}>
                   <BtImg onBtClick={()=>onBtMakeTransferClick()} classN={cl.btImg} text={"переместить"} imgURL={Domen+"/images/tranferAsset.png"}/>

                    <button onClick={()=>onBtShowTransferHistoryClick()}>история перемещений</button>
                </div>


                <div className={cl.wrapper_scan_res}>

                    <div className={cl.wrapper_scan_res_field}>
                        <div className={cl.wrapper_scan_res_field_name}><span> Наименование</span></div>
                        <div className={cl.wrapper_scan_res_field_value}>{selectedAsset.nomenclature.name}</div>
                    </div>
                    <div className={cl.wrapper_scan_res_field}>
                        <div className={cl.wrapper_scan_res_field_name}><span> Место Хранение</span></div>
                        <div className={cl.wrapper_scan_res_field_value}>{selectedAsset.store.name}</div>
                    </div>
                    <div className={cl.wrapper_scan_res_field}>
                        <div className={cl.wrapper_scan_res_field_name}><span> Индефикатор</span></div>
                        <div className={cl.wrapper_scan_res_field_value}>{selectedAsset.asset.uuid}</div>
                    </div>

                    <div className={cl.wrapper_scan_res_field_img}>
                        <img src={Domen + "/images/items_img/" + selectedAsset.nomenclature.uuid + ".jpg"}/>
                    </div>
                    <AssetQRCode assetQrCodeFields={{
                        assetNomenclatureName:selectedAsset.nomenclature.name,
                        assetUUID:selectedAsset.asset.uuid
                    }}/>
                </div>


            </div>
        );
    }
    return (<div/>)
};

export default QrScanResult;