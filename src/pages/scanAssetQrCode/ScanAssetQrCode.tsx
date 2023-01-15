import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./ScanAssetQrCode.module.css"
import QrScan from "../../components/qrscan/QrScan";
import {StrUUID} from "../../structs/App";
import {Fetches} from "../../fetches/Fetches";
import {TAsset} from "../../structs/Asset";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
const ScanAssetQrCode:FC = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [scanRes,setScanRes]=useState<string|null>(null)
    const onResult=(data:string)=>{
       setScanRes(()=>data)
        let strSend:StrUUID={
            uuid:data
        }
        Fetches.GetAssetBySTRUUID(strSend).then(r=>{
            let as:TAsset|Error=r
            if(!(as instanceof Error )&&as.asset.id>0){
                console.log(as)
                // @ts-ignore
                dispatch(SetSelectedAssetState(as))
                navigate(RouterPath.QR_SCAN_RESULT)
            }
            if(as instanceof Error){
                setScanRes(()=>"Товар не найден")
            }

        })
    }
    if (!scanRes) {
        return (
            <div className={cl.wrapper}>

                <QrScan onResult={onResult}/>

            </div>
        );
    }
    return (<div>
        <h1>{scanRes}</h1>
    </div>)
};

export default ScanAssetQrCode;