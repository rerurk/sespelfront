import React, {ChangeEvent, FC, useState} from 'react';
// @ts-ignore
import classes from "./MakeAsset.module.css"
import ImageRedactor, {GetImage, NewImageFile} from "../imageRedactor/ImageRedactor";
import {Asset} from "../../structs/Asset";
import {Fetches} from "../../fetches/Fetches";
import {MakeAssetFields} from "../../texts/Texts";
import {NewAsset} from "../../structs/transportSructs";

const MakeAsset: FC = () => {
    let fieldDisabled: boolean = false


    const [newAsset,setNewAsset]=useState<Asset>({
        description: "",
        groupID: 0,
        id: 0,
        name: "",
        parentAssetID: 123123123,
        image: ""

    })
    const onBtCreate = () => {
        console.log("onBtCreate")
        let img: NewImageFile | undefined = GetImage()



        let trNewAsset:NewAsset={
            NewAsset:newAsset,
            Image: []

        }
        if (img) {
            console.log(img.fileName)
            console.log(img.fileBytes)
            newAsset.image = img.fileName
            trNewAsset.Image=img.fileBytes
        }

        Fetches.SaveNewAsset(trNewAsset).then(r => {})
    }

    const onChangeName = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNewAsset(()=>({
            ...newAsset,name:e.target.value
        }))

    }
    const onChangeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        console.log(e.target.value)
        newAsset.description=e.target.value
       setNewAsset(()=>({
           ...newAsset,description:e.target.value
       }))
    }
    return (
        <div className={classes.wrapper}>

            <ImageRedactor/>
            <div>
                <div className={classes.fieldWrapper}>
                    <span>{MakeAssetFields.NAME}:</span>
                    <textarea disabled={fieldDisabled} value={newAsset.name}
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChangeName(e)}/>

                </div>
                <div className={classes.fieldWrapper}>
                    <span>{MakeAssetFields.DESCRIPTION}:</span>
                    <textarea disabled={fieldDisabled} value={newAsset.description}
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChangeDescription(e)}/>

                </div>
            </div>
            <button onClick={onBtCreate}>Сохранить</button>

        </div>
    );
};

export default MakeAsset;