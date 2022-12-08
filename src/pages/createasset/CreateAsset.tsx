import React, {FC} from 'react';

// @ts-ignore
import cl from './CreateAsset.module.css'
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";


const CreateAsset: FC = () => {
    const navigate = useNavigate();
    return (
        <div className={cl.wrapper}>
            <h1>Тут создаем ТМЦ</h1>
            <button onClick={ ()=>  navigate(RouterPath.CATALOG_SETUP)}>назад</button>
        </div>
    );
};

export default CreateAsset;