import React, {FC, useState} from 'react';
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

interface QrScanProps {
    onResult:(result:string)=>void
}
const QrScan: FC<QrScanProps> = ({onResult}) => {

    const [qrRes, setQrRes] = useState<string | null>(null)

    const handleScan = (data: string) => {

        if (data) {
            onResult(data)
            setQrRes(data)

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
    if(qrRes)
    return (
        <div>
             <label>{qrRes}</label>

        </div>
    )
    return (<div/>)
};

export default QrScan;