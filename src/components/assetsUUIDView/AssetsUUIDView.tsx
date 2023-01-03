import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
// @ts-ignore
import cl from "./AssetsUUIDView.module.css"
import {AssetsUUIDByNomenclItem, TAsset} from "../../structs/Asset";
import {Item} from "../../structs/App";
import PrintQrCodes from "../../pages/printQrCodes/PrintQrCodes";

interface AssetsUuidViewProps {
    assetsUUIDByNomenclItem: AssetsUUIDByNomenclItem
    store:Item
    onClose: () => void
}
const AssetsUuidView:FC<AssetsUuidViewProps> = ({assetsUUIDByNomenclItem,onClose}) => {
    console.log(assetsUUIDByNomenclItem)
    const [assets,setAssets]=useState<TAsset[]|null>()
    useEffect(()=>{

    })
    if(assets){
    return (
        <div className={cl.wrapper} >
            <PrintQrCodes assetsToPrint={assets} close={onClose}/>
        </div>
    );}
    return (<div/>)
};

export default AssetsUuidView;