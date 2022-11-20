import React, {FC} from 'react';
// @ts-ignore
import cl from './Rote.module.css'
import {useNavigate} from "react-router-dom";
import {Texts} from "../../texts/Texts";
const Route: FC = () => {
    const navigate = useNavigate();
    return (
        <div className={cl.wrapper}>
            <h1 onClick={()=>{ navigate("/")}}>{Texts.MAIN}</h1>
            <h1 onClick={()=>{ navigate("/addAsset/")}}>{Texts.CREATE_ASSET}</h1>
            <h1 onClick={()=>{ navigate("/moveAsset/")}}>{Texts.MOVE_ASSET}</h1>
        </div>
    );
};

export default Route;