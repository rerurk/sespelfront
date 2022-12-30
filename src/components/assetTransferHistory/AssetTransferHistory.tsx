import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./AssetTransferHistory.module.css"
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {StrSend} from "../../structs/App";
import {AssetHistory} from "../../structs/Asset";


interface AssetTransferHistoryProps {
    onClickBack:()=>void
}

const AssetTransferHistory:FC<AssetTransferHistoryProps> = ({onClickBack}) => {

    const {selectedAsset} = useTypeSelector(state => state.appReducer)
    const [history,setHistory]=useState<AssetHistory[]|null>(null)
   useEffect(()=>{
       if(selectedAsset){
           let strUUID:StrSend={
               str:selectedAsset.asset.uuid
           }
           Fetches.GetAssetTransferHistory(strUUID).then(r=>{
               if(!(r instanceof Error)){
                   setHistory(()=>r)
               }
           })

       }
   },[])
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_bts}>
                <button onClick={()=>onClickBack()}>назад</button>
            </div>
            <div className={cl.wrapper_history}>
                {
                    history
                        ?history.map((h:AssetHistory,ind:number)=>
                            <div className={cl.wrapper_history_field} key={"AssetTransferHistory_"+ind}>
                                <div className={cl.wrapper_history_field_store_name}><span>{h.store.name}</span></div>
                                <div className={cl.wrapper_history_field_time}>{h.create_time}</div>
                            </div>)


                        :false
                }
            </div>

        </div>
    );
};

export default AssetTransferHistory;