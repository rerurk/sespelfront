import React, {useState} from 'react';
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

const QrScanResult = () => {
    const {selectedAsset, storeGroupRoot, selectedStore} = useTypeSelector(state => state.appReducer)
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
            Fetches.TransferItem(transfer).then(r => console.log(r))
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