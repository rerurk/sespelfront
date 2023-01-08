import React, {FC, useState} from 'react';

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
export type TAssetListView={

    nomenclatureName:string,
    uuid:string,
    time:string,

}
interface AssetListViewProps{
    a:TAssetListView
    ind:number,
}

const AssetListView: FC<AssetListViewProps> = ({a, ind}) => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const showAsset = () => {

        let strSend:StrUUID={
            uuid:a.uuid
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
               code:a.uuid,
               name:a.nomenclatureName
           }
           // @ts-ignore
            dispatch(AddQrCodeToState(qrCode))
        }else {
            let qrCode:QrCodeFields={
                code:a.uuid,
                name:a.nomenclatureName
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
                    a.nomenclatureName
                }
                </span>
            </div>
            <div className={cl.wrapper_time}>
                <span>
                {
                    a.time
                }
                </span>
            </div>
            <div className={cl.wrapper_printing} onClick={event => event.stopPropagation()}>
                <input type="checkbox" defaultChecked={IsQrCodeContainsInState(a.uuid)} onChange={event => onChangeCheck(event)} />
            </div>

        </div>
    );
};

export default AssetListView;