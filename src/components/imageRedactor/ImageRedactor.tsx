import React, {FC, useState} from 'react';
// @ts-ignore
import classes from "./ImageRedactor.module.css"
import {DefSrc} from "../../texts/Texts";



export type NewImageFile = {
    file_extension: string
    file_bytes: Array<any>

}

let fileReader: FileReader = new FileReader()

export function GetImage(): NewImageFile | null {
       if (gettingImage.file_bytes.length>0&&gettingImage.file_extension.length>0){
           return gettingImage
       }
        return null
}
let gettingImage: NewImageFile={
    file_bytes:[],
    file_extension:""
}

const ImageRedactor: FC = () => {
    const [img,setImg]=useState<string>(DefSrc.ADD_IMAGE)
    function addToNewImages(file: File) {
        let blobURL: string = URL.createObjectURL(file)
        setImg(()=>blobURL)

        gettingImage.file_extension =getFileExtension(file.name)
        gettingImage.file_bytes=getArrBytesFromFile(file)



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