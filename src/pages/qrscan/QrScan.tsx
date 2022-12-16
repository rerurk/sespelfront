import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import QrReader from 'react-qr-scanner'

// @ts-ignore
import cl from './QrScan.module.css'
import ShowAsset from "../../components/asset/showAsset/ShowAsset";
import {useDispatch} from "react-redux";
import {Fetches} from "../../fetches/Fetches";
import {SetCurrentAsset} from "../../store/action_creator/CatalogStoreActions";



let wmin: number = 200

const QrScan: FC = () => {
    const [qrRes, setQrRes] = useState<string | null>(null)
    const [camSize, setCamSize] = useState<number>(200)
    const dispatch = useDispatch()
    useEffect(() => {
        wmin = Math.min(window.innerHeight, window.innerWidth)
        setCamSize(wmin * 0.9)

        // @ts-ignore
        dispatch(SetCurrentAsset(null))


    }, [])
    const previewStyle = {
        height: camSize,
        width: camSize,
    }

    const handleScan = (data: any) => {

        if (data) {
            setQrRes(data.text)


            Fetches.GetAssetAndStoreByUUID(data.text).then(r => {

                if (!(r instanceof Error)) {
                    // @ts-ignore
                    dispatch(SetCurrentAsset(r))
                }

            })


        }
    }
    const handleError = (err: Error) => {
        console.error(err)
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
                        delay={1000}
                        style={previewStyle}
                        onError={handleError}
                        onScan={handleScan}
                    />

                </div>

            </div>
        );
    }
    return (
        <div>

            <ShowAsset assetUUID={qrRes}/>
            <button onClick={onRepeatBtClick}>повторить</button>
        </div>
    )
};

export default QrScan;