import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css"

import StoreView from "./StoreView";
import StoreSelect from "./StoreSelect";

const AssetsStores: FC = () => {
    const onBtCreateNewClick = () => {


    }

    return (
        <div className={cl.wrapper}>
            <StoreSelect/>
            <StoreView/>


        </div>
    );
};

export default AssetsStores;