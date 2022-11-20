import React, {FC} from 'react';
import Asset from "../../components/asset/Asset";
// @ts-ignore
import cl from './CreateAsset.module.css'

const CreateAsset: FC = () => {
    return (
        <div className={cl.wrapper}>
            <Asset/>
        </div>
    );
};

export default CreateAsset;