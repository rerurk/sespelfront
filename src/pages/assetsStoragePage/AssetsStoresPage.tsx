import React, {FC} from 'react';
import AssetsStores from "../../components/assetsStores/AssetsStores";
// @ts-ignore
import cl from "./AssetsStoresPage.module.css"
// склад в основной таблице ничем не отличаеться кроме маски
const AssetsStoresPage: FC = () => {

    return (
        <div className={cl.wrapper}>
            <AssetsStores/>
        </div>
    );
};

export default AssetsStoresPage;