import React, {FC, useEffect} from 'react';
// @ts-ignore
import cl from "./AssetTransferHistory.module.css"
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {StrSend} from "../../structs/App";


interface AssetTransferHistoryProps {
    onClickBack:()=>void
}

const AssetTransferHistory:FC<AssetTransferHistoryProps> = ({onClickBack}) => {

    const {selectedAsset} = useTypeSelector(state => state.appReducer)
   useEffect(()=>{
       if(selectedAsset){
           let strUUID:StrSend={
               str:selectedAsset.asset.uuid
           }

       }
   },[])
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_bts}>
                <button onClick={()=>onClickBack()}>назад</button>
            </div>
        </div>
    );
};

export default AssetTransferHistory;