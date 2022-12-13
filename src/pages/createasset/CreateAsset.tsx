import React, {FC} from 'react';
// @ts-ignore
import cl from './CreateAsset.module.css'
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import MakeAsset from "../../components/makeAsset/MakeAsset";


const CreateAsset: FC = () => {
    const navigate = useNavigate();
    const {currCatalogItem} = useTypeSelector(state => state.showCatalogNode)
    if (currCatalogItem) {
        return (
            <div className={cl.wrapper}>
                <div className={cl.wrapper_head}>
                    <button onClick={() => navigate(RouterPath.CATALOG_SETUP)}>назад</button>
                    <label key={"createAsset_" + currCatalogItem.sys_id}>Наименование ТМЦ: {currCatalogItem.name}</label>
                </div>
                <MakeAsset key={"MakeAsset"}/>
            </div>
        );
    }
    return (<div></div>)
};

export default CreateAsset;