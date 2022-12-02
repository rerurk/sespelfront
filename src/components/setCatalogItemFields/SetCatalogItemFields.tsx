import React, {ChangeEvent, FC, useState} from 'react';
// @ts-ignore
import classes from "./SetCatalogItemFields.module.css"
import ImageRedactor, {GetImage, NewImageFile} from "../imageRedactor/ImageRedactor";
import {Asset} from "../../structs/Asset";

import {NewAsset} from "../../structs/transportSructs";
import {ItemFields} from "../../texts/Texts";
import {useTypeSelector} from "../../hooks/useTypeSelector";

const SetCatalogItemFields: FC = () => {
    let fieldDisabled: boolean = true
    const {currCatalogItem} = useTypeSelector(state => state.showCatalogNode)
    console.log(currCatalogItem?.name)
    const [newAsset,setNewAsset]=useState<Asset>({
        description: "", id: 0, image: "", is_table: "", name: "", ref: "",assets:[]

    })
    const onBtCreate = () => {

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
                    <span>{ItemFields.NAME}:</span>
                    <textarea disabled={fieldDisabled} value={currCatalogItem?.name}
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChangeName(e)}></textarea>

                </div>
                <div className={classes.fieldWrapper}>
                    <span>{ItemFields.DESCRIPTION}:</span>
                    <textarea disabled={fieldDisabled} value={newAsset.description}
                              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChangeDescription(e)}/>

                </div>
            </div>


        </div>
    );
};

export default SetCatalogItemFields;