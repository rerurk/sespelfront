import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
    import QrReader from 'modern-react-qr-reader'

// @ts-ignore
import cl from './QrScan.module.css'

import {useDispatch} from "react-redux";
import {Fetches} from "../../fetches/Fetches";
import {StrSend} from "../../structs/App";
import {TAsset} from "../../structs/Asset";





let wmin: number = 200

const QrScan: FC = () => {
    const [qrRes, setQrRes] = useState<string | null>(null)
    const [camSize, setCamSize] = useState<number>(200)

    useEffect(() => {
        wmin = Math.min(window.innerHeight, window.innerWidth)
        setCamSize(wmin * 0.9)




    }, [])


    const handleScan = (data: any) => {

        if (data) {
            setQrRes(data)
            console.log(data)
            let strSend:StrSend={
                str:data
            }
            Fetches.GetAssetByUUID(strSend).then(r=>{
                if(!(r instanceof Error)){
                    let as:TAsset=r
                    console.log("Намиенование:",as.nomenclature.name)
                    console.log("Склад:",as.store.name)
                }
            })


        }
    }
    const handleError = (err: Error) => {
        alert(err)
    }
    const onRepeatBtClick = () => {
        setQrRes(() => null)
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

            <button onClick={onRepeatBtClick}>повторить</button>
        </div>
    )
};

export default QrScan;