import React, {FC} from 'react';
import Asset from "../../components/asset/Asset";
// @ts-ignore
import cl from './CreateAsset.module.css'
import MakeAsset from "../../components/makeAsset/MakeAsset";

const CreateAsset: FC = () => {
    return (
        <div className={cl.wrapper}>
          <MakeAsset/>
        </div>
    );
};

export default CreateAsset;