import React, {FC} from 'react';
// @ts-ignore
import cl from './ShowAllAssetsByCatalogName.module.css'
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import AllAssetsByCatalogItem from "../../components/asset/allAssetsByCatalogItem/AllAssetsByCatalogItem";
import AssetQRCodeView from "../../components/assetQRCodeView/AssetQRCodeView";

const ShowAllAssetsByCatalogName: FC = () => {
    const navigate = useNavigate();
    const {currCatalogItem} = useTypeSelector(state => state.appReducer)
    if (currCatalogItem) {
        return (
            <div className={cl.wrapper}>
                <div className={cl.wrapper_head}>
                    <button onClick={() => navigate(RouterPath.NOMENCLATURE)}>назад</button>
                    <label key={"createAsset_" + currCatalogItem.uuid}>Наименование ТМЦ: {currCatalogItem.name}</label>
                </div>
                <AllAssetsByCatalogItem catalogItem={currCatalogItem}    key={"AllAssetsByCatalogItem_" + currCatalogItem.uuid}/>
                <AssetQRCodeView/>

            </div>
        );
    }
    return (<div></div>)
};

export default ShowAllAssetsByCatalogName;