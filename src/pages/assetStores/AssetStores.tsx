import React, {FC} from 'react';

// @ts-ignore
import cl from "./AssetStores.module.css"
import StoreGroupRoot from "../../components/stores/storeGroupRoot/StoreGroupRoot";


const AssetStores: FC = () => {

    return (
        <div className={cl.wrapper}>
          <StoreGroupRoot/>
        </div>
    );
};

export default AssetStores;