import React, {FC, useState} from 'react';
import {CatalogNode} from "../../structs/catalog";

// @ts-ignore
import cl from "./CatalogNodeView.module.css"
interface CatalogNodeViewProps {
    node: CatalogNode
    keyVal: number
}

const CatalogNodeView: FC<CatalogNodeViewProps> = ({node, keyVal}) => {
    const [nodesClName,setNodesClName]=useState<string>(cl.wrapper__nodes_hidden)
    const [nodesIsHide,setNodesIssHidden]=useState<boolean>(true)
    function onNameClick() {
        nodesIsHide?setNodesClName(cl.wrapper__nodes_show):setNodesClName(cl.wrapper__nodes_hidden)
        setNodesIssHidden(!nodesIsHide)
    }
    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
            <div className={cl.wrapper__name} onClick={onNameClick}>{node.name}</div>
            <div className={nodesClName}>
            {
                node.nodes
                    ? node.nodes.map((chNode: CatalogNode, ind: number) => <CatalogNodeView node={chNode}

                                                                                            keyVal={keyVal + 1}
                                                                                            key={"k"+keyVal+ind}/>
                                                                                            )
                    : false
            }
            </div>
        </div>
    );
};

export default CatalogNodeView;