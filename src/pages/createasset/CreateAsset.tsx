import React, {FC} from 'react';
import Asset from "../../components/asset/Asset";
// @ts-ignore
import cl from './CreateAsset.module.css'
import SetCatalogItemFields from "../../components/setCatalogItemFields/SetCatalogItemFields";

const CreateAsset: FC = () => {
    return (
        <div className={cl.wrapper}>
          <SetCatalogItemFields/>
        </div>
    );
};

export default CreateAsset;