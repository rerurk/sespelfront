import React, {useEffect, useState} from 'react';
// @ts-ignore
import cl from "./QrScanResult.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";
import StoreGroupItem from "../../components/stores/storeGroupItem/StoreGroupItem";
import {Fetches} from "../../fetches/Fetches";
import {TransferItem} from "../../structs/App";
import {Tools} from "../../tools/Tools";
import {TAsset} from "../../structs/Asset";

const QrScanResult = () => {
    const {selectedAsset, storeGroupRoot, selectedStore} = useTypeSelector(state => state.appReducer)
    useEffect(() => {
        if (selectedStore?.uuid === selectedAsset?.store.uuid&&isShowStores) {
            alert(`"${selectedAsset?.nomenclature.name}" уже на складе ` + `"${selectedStore?.name}".`)
        }
    }, [selectedStore])
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [isShowStores, setIsShowStores] = useState<boolean>(false)


    const onBtScanClick = () => {
        // @ts-ignore
        dispatch(SetSelectedAssetState(null))
        navigate(RouterPath.QR_CODE_SCANNER)

    }
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
                    Fetches.GetAssetBySTRUUID({str: selectedAsset.asset.uuid}).then(r => {
                        let as: TAsset | Error = r
                        if (!(as instanceof Error)) {
                            // @ts-ignore
                            dispatch(SetSelectedAssetState(as))
                        }
                    })

                }
            })
        }
    }


    if (selectedAsset && storeGroupRoot) {
        return (
            <div className={cl.wrapper}>
                <div className={cl.wrapper_tools}>
                    <button onClick={() => onBtScanClick()}>Сканировать</button>
                    <button onClick={() => onBtMakeTransferClick()}>переместить</button>
                </div>
                <div className={cl.wrapper_scan_res}>
                    <span>Наименование: {selectedAsset.nomenclature.name}</span>
                    <span>Место Хранение: {selectedAsset.store.name}</span>
                    <span>QrCode: {selectedAsset.asset.uuid}</span>

                </div>
                {
                    isShowStores
                        ? <div>
                            <button onClick={onBtTransferClick}>переместить в {selectedStore?.name}</button>
                            <StoreGroupItem item={storeGroupRoot}/>

                        </div>
                        : false
                }

            </div>
        );
    }
    return (<div/>)
};

export default QrScanResult;