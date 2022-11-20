import React, {FC, useState} from 'react';
// @ts-ignore
import classes from "./ImageRedactor.module.css"
import {DefSrc} from "../../texts/Texts";



export type NewImageFile = {
    fileName: string
    fileBytes: Array<any>

}

let fileReader: FileReader = new FileReader()

export function GetImage(): NewImageFile | undefined {
        return gettingImage
}
let gettingImage: NewImageFile={
    fileBytes:[],
    fileName:""
}



const ImageRedactor: FC = () => {
    const [img,setImg]=useState<string>(DefSrc.ADD_IMAGE)
    function addToNewImages(file: File) {
        let blobURL: string = URL.createObjectURL(file)
        setImg(()=>blobURL)

        gettingImage.fileName = getFileNameFromBlobURL(blobURL) + "." + getFileExtension(file.name)
        gettingImage.fileBytes=getArrBytesFromFile(file)



    }

    function getFileExtension(fileName: string): string {
        return fileName.split(".")[fileName.split(".").length - 1]
    }

    function getFileNameFromBlobURL(blob: string): string {


        return blob.split("/")[blob.split("/").length - 1]
    }

    function getArrBytesFromFile(file:File):Array<any> {
        let fileByteArray: any[] = [];
        fileReader.readAsArrayBuffer(file)
        fileReader.onloadend = function (evt) {
            // @ts-ignore
            if (evt.target.readyState == FileReader.DONE) {
                // @ts-ignore

                const arrayBuffer = evt.target.result;

                // @ts-ignore
                let  array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < array.length; i++) {
                    fileByteArray.push(array[i]);
                }


            }
        }
        return fileByteArray

    }

    function onImageInput(e: React.ChangeEvent<HTMLInputElement>) {
        console.log("onImageInput")
        if (e.target.files) {

            if (e.target.files.length > 0) {

                addToNewImages(e.target.files[0])

            }

        }

    }

    return (
        <div className={classes.wrapper}>
            <img src={img}/>
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={event => onImageInput(event)}
            />

        </div>
    );
};

export default ImageRedactor;