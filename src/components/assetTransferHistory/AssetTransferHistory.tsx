import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./AssetTransferHistory.module.css"
import {useNavigate} from "react-router-dom";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {Fetches} from "../../fetches/Fetches";
import {StrUUID} from "../../structs/App";
import {AssetHistory} from "../../structs/Asset";
import CloseBt from "../UI/closeBt/CloseBt";


interface AssetTransferHistoryProps {
    onClickBack:()=>void
}

const AssetTransferHistory:FC<AssetTransferHistoryProps> = ({onClickBack}) => {

    const {selectedAsset} = useTypeSelector(state => state.appReducer)
    const [history,setHistory]=useState<AssetHistory[]|null>(null)
   useEffect(()=>{
       if(selectedAsset){
           let strUUID:StrUUID={
               uuid:selectedAsset.asset.uuid
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


            <div className={cl.wrapper_history}>

                <div className={cl.wrapper_head}>
                    <CloseBt close={()=>onClickBack()}/>
                    <div className={cl.wrapper_history_field_store_name}><span>Склад</span></div>
                    <div className={cl.wrapper_history_field_time}><span>дата перемещения (гггг.мм.чч)</span></div>
                </div>
                <div className={cl.wrapper_history_fields}>
                {
                    history
                        ?
                        history.map((h:AssetHistory,ind:number)=>

                            <div className={ind%2==0?cl.wrapper_history_field:[cl.wrapper_history_field,cl.wrapper_nMod2].join(" ")} key={"AssetTransferHistory_"+ind}>
                                <div className={cl.wrapper_history_field_store_name}><span>{h.store.name}</span></div>
                                <div className={cl.wrapper_history_field_time}>{h.create_time}</div>
                            </div>)


                        :false
                }
                </div>
            </div>

        </div>
    );
};

export default AssetTransferHistory;