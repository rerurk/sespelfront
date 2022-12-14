import React, {FC} from 'react';
// @ts-ignore
import cl from "./AssetsStores.module.css"

import StoreView from "./StoreView";
import AllStores from "./AllStores";

const AssetsStores: FC = () => {
    const onBtCreateNewClick = () => {


    }

    return (
        <div className={cl.wrapper}>
           <StoreView/>
           <AllStores/>

        </div>
    );
};

export default AssetsStores;