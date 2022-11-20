import React, {FC} from 'react';
// @ts-ignore
import cl from './Rote.module.css'
import {useNavigate} from "react-router-dom";
import {RouterTexts} from "../../texts/Texts";
const Route: FC = () => {
    const navigate = useNavigate();
    return (
        <div className={cl.wrapper}>
            <h1 onClick={()=>{ navigate("/")}}>{RouterTexts.MAIN}</h1>
            <h1 onClick={()=>{ navigate("/addAsset/")}}>{RouterTexts.CREATE_ASSET}</h1>
            <h1 onClick={()=>{ navigate("/moveAsset/")}}>{RouterTexts.MOVE_ASSET}</h1>
        </div>
    );
};

export default Route;