import React, {FC, useEffect, useState} from 'react';

import {StrUUID} from "../../structs/App";
import {Fetches} from "../../fetches/Fetches";
import {QrCodeFields, TAsset} from "../../structs/Asset";
import {
    AddQrCodeToState,
    RemoveQrCodeFromState,
    SetSelectedAssetState
} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {IsQrCodeContainsInState} from "../../store/reducers/appReducer";

// @ts-ignore
import cl from "./assetListView.module.css"
import {useTypeSelector} from "../../hooks/useTypeSelector";
export type TAssetListView={

    nomenclatureName:string,
    uuid:string,
    time:string,

}
interface AssetListViewProps{
    as:TAssetListView
    ind:number,
}

const AssetListView: FC<AssetListViewProps> = ({as, ind}) => {
    const {qrCodes} = useTypeSelector(state => state.appReducer)

    useEffect(()=>{

    },[qrCodes?.length])
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const showAsset = () => {

        let strSend:StrUUID={
            uuid:as.uuid
        }
            Fetches.GetAssetBySTRUUID(strSend).then(r=>{
                let as:TAsset|Error=r
                if(!(as instanceof Error )&&as.asset.id>0){
                    // @ts-ignore
                    dispatch(SetSelectedAssetState(as))
                    navigate(RouterPath.QR_SCAN_RESULT)
                }
            })



    }
    

    const onChangeCheck = (e:React.ChangeEvent<HTMLInputElement>) => {

        if(e.target.checked){
           let qrCode:QrCodeFields={
               code:as.uuid,
               name:as.nomenclatureName
           }
           // @ts-ignore
            dispatch(AddQrCodeToState(qrCode))
        }else {
            let qrCode:QrCodeFields={
                code:as.uuid,
                name:as.nomenclatureName
            }
            // @ts-ignore
            dispatch(RemoveQrCodeFromState(qrCode))
        }

    };

    return (
        <div className={ind%2==0?cl.wrapper:[cl.wrapper,cl.wrapper_nMod2].join(" ")} onClick={()=>showAsset()}>
            <div className={cl.wrapper_n}>
                <span>
                {ind}.
                </span>
            </div>
            <div className={cl.wrapper_name}>
                <span>
                {
                    as.nomenclatureName
                }
                </span>
            </div>
            <div className={cl.wrapper_time}>
                <span>
                {
                    as.time
                }
                </span>
            </div>
            <div className={cl.wrapper_printing} onClick={event => event.stopPropagation()}>
                <input
                    key={"AssetListView_key_"+as.uuid}
                    type="checkbox"
                    checked={IsQrCodeContainsInState(as.uuid)}
                    onChange={event => onChangeCheck(event)} />
            </div>

        </div>
    );
};

export default AssetListView;