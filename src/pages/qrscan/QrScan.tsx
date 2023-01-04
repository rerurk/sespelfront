import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
    import QrReader from 'modern-react-qr-reader'

// @ts-ignore
import cl from './QrScan.module.css'

import {useDispatch} from "react-redux";
import {Fetches} from "../../fetches/Fetches";
import {StrUUID} from "../../structs/App";
import {TAsset} from "../../structs/Asset";
import {useNavigate} from "react-router-dom";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";





let wmin: number = 200

const QrScan: FC = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [qrRes, setQrRes] = useState<string | null>(null)

    const handleScan = (data: any) => {

        if (data) {
            setQrRes(data)

            let strSend:StrUUID={
                uuid:data
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
    }
    const handleError = (err: Error) => {
        alert(err)
    }

    if (!qrRes) {
        return (
            <div className={cl.wrapper}>
                <div className={cl.wrapper_scanner}>
                    <QrReader

                        showViewFinder={false}
                        delay={200}
                        facingMode={"environment"}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%'}}
                    />
                    <div className={cl.wrapper_scanner_box}>
                        <div className={cl.wrapper_scanner_box_reader}>
                            <div className={cl.wrapper_scanner_box_reader_line}>

                            </div>
                        </div>
                    </div>



                </div>

            </div>
        );
    }
    return (
        <div>
             <label>{qrRes}</label>

        </div>
    )
};

export default QrScan;