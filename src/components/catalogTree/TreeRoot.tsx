import React, {FC} from 'react';
// @ts-ignore
import cl from "./TreeRoot.module.css"
import TreeNode from "./TreeNode";
import {useTypeSelector} from "../../hooks/useTypeSelector";

const TreeRoot: FC = () => {


    const {catalogRoot} = useTypeSelector(state => state.showCatalogNode)

    return (
        <div className={cl.wrapper}>{
            (catalogRoot)
                ? <TreeNode item={catalogRoot} key={"TreeNode"+catalogRoot.uuid} />
                : false
        }
        </div>
    );
};

export default TreeRoot;