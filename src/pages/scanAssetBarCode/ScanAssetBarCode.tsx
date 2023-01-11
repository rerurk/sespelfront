import React, {FC, useState} from 'react';
// @ts-ignore
import cl from  "./ScanAssetBarCode.module.css"
import BarcodeScanner from "../../components/barcodeScanner/BarcodeScanner";
const ScanAssetBarCode:FC = () => {
    const [scanResult,setScanResult]=useState<string|null>(null)
    const onResultScan =(res:string)=>{
        console.log("ScanAssetBarCode:",res)
        setScanResult(res)
    }
    if(!scanResult) {
        return (
            <div className={cl.wrapper}>
                <BarcodeScanner onResult={onResultScan}/>
            </div>
        );
    }
    return (<div>
        <h3>{scanResult}</h3>
    </div>)
};

export default ScanAssetBarCode;