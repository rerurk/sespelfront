import React, {FC, useState} from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
// @ts-ignore
import cl from "./BarcodeScanner.module.css"

interface BarcodeScannerProps {
    onResult:(res:string)=>void
}

const BarcodeScanner:FC<BarcodeScannerProps> = ({onResult}) => {
    const [data, setData] = useState<string|null>(null);
    const onScanResult=(data :string)=>{
        onResult(data)
        setData(data)
    }
    if (!data) {
        return (
            <div className={cl.wrapper}>
                <div className={cl.wrapper_scanner}>
                <BarcodeScannerComponent
                    width={500}
                    height={500}
                    delay={100}
                    onUpdate={(err, result) => {

                        if (result) {
                            //@ts-ignore
                            onScanResult(result.text)
                            //setData(result.text)
                            console.log(result)
                        }
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

    </div>)
};

export default BarcodeScanner;