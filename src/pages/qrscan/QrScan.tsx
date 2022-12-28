import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
    import QrReader from 'modern-react-qr-reader'

// @ts-ignore
import cl from './QrScan.module.css'

import {useDispatch} from "react-redux";
import {Fetches} from "../../fetches/Fetches";
import {StrSend} from "../../structs/App";
import {TAsset} from "../../structs/Asset";
import {useNavigate} from "react-router-dom";
import {SetSelectedAssetState} from "../../store/action_creator/AppStoreActions";
import {RouterPath} from "../../router";





let wmin: number = 200

const QrScan: FC = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [qrRes, setQrRes] = useState<string | null>(null)
    const [camSize, setCamSize] = useState<number>(200)

    useEffect(() => {
        wmin = Math.min(window.innerHeight, window.innerWidth)
        setCamSize(wmin * 0.9)




    }, [])


    const handleScan = (data: any) => {

        if (data) {
            setQrRes(data)

            let strSend:StrSend={
                str:data
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
                <div style={{
                    width: `${wmin}px`,
                    height: `${wmin}px`,

                }}>
                    <QrReader
                        delay={500}
                        facingMode={"environment"}

                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />

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