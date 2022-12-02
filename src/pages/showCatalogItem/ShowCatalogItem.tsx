import React, {FC} from 'react';
// @ts-ignore
import cl from './ShowCatalogItemmodule.css'
import {useNavigate} from "react-router-dom";
import {RouterPath} from "../../router";
import SetCatalogItemFields from "../../components/setCatalogItemFields/SetCatalogItemFields";

const ShowCatalogItem: FC = () => {
    const navigate = useNavigate();
    return (
        <div className={cl.wrapper}>
            <SetCatalogItemFields/>
            <button onClick={() => navigate(RouterPath.CATALOG_SETUP)}>Назад</button>
        </div>
    );
};

export default ShowCatalogItem;