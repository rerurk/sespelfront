import React, {FC} from 'react';
import AssetsStorages from "../../components/assetsStorages/AssetsStorages";
// @ts-ignore
import cl from "./AssetsStoragePage.module.css"
// склад в основной таблице ничем не отличаеться кроме маски
const AssetsStoragePage: FC = () => {

    return (
        <div className={cl.wrapper}>
            <AssetsStorages/>
        </div>
    );
};

export default AssetsStoragePage;