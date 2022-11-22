import React, {FC} from 'react';
// @ts-ignore
import cl from "./CatalogTree.module.css"
import {CatalogNode} from "../../structs/catalog";
import CatalogNodeView from "../catalogNodeView/CatalogNodeView";

interface CatalogTreeProps {
    catalogNode: CatalogNode
}

function showNode(node: CatalogNode) {
    console.log(node.name)

}

const CatalogTree: FC<CatalogTreeProps> = ({catalogNode}) => {

    showNode(catalogNode)
    return (
        <CatalogNodeView node={catalogNode} keyVal={1}/>
    );
};

export default CatalogTree;