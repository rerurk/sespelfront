import React, {FC, useState} from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
// @ts-ignore
import cl from "./BarcodeScanner.module.css"

const BarcodeScanner:FC = () => {
    const [data, setData] = useState<string|null>(null);
    if (!data) {
        return (
            <div className={cl.wrapper}>
                <div className={cl.wrapper_scanner}>
                <BarcodeScannerComponent
                    width={500}
                    height={500}
                    delay={100}
                    onUpdate={(err, result) => {
                        //@ts-ignore
                        if (result) setData(result.text);
                        else setData(() => null);
                    }}
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
    return (<div>
        <p>{data}</p>
    </div>)
};

export default BarcodeScanner;