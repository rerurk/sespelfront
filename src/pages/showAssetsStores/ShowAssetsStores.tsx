import React, {FC} from 'react';

// @ts-ignore
import cl from "./ShowAssetsStores.module.css"
import StoresSelect from "../../components/assetsStores/StoresSelect";
import StoreView from "../../components/assetsStores/StoreView";
// склад в основной таблице ничем не отличаеться кроме маски
const ShowAssetsStores: FC = () => {

    return (
        <div className={cl.wrapper}>
            <StoresSelect/>
            <StoreView/>
        </div>
    );
};

export default ShowAssetsStores;