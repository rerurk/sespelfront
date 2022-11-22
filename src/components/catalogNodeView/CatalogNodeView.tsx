import React, {FC, useState} from 'react';
import {CatalogNode} from "../../structs/catalog";
// @ts-ignore
import cl from "./CatalogNodeView.module.css"
import {Fetches} from "../../fetches/Fetches";

interface CatalogNodeViewProps {
    node: CatalogNode
    keyVal: number
}

const CatalogNodeView: FC<CatalogNodeViewProps> = ({node, keyVal}) => {
    const [nodesClName, setNodesClName] = useState<string>(cl.wrapper__nodes_hidden)
    const [nodesIsHide, setNodesIssHidden] = useState<boolean>(true)

    function onNameClick() {
        nodesIsHide ? setNodesClName(cl.wrapper__nodes_show) : setNodesClName(cl.wrapper__nodes_hidden)
        setNodesIssHidden(!nodesIsHide)
    }

    function confirmAdd(newNodeName: string) {
        console.log()
    }

    function addSubNode(e: React.MouseEvent<HTMLButtonElement>, node: CatalogNode) {
        console.log(node)
        console.log(e.currentTarget.parentElement)
        let res: string | null = window.prompt("Чаво?")
        console.log(res)
        if (res) {
            let newNode: CatalogNode = {his_id: "", name: res, nodes: [], parent_id: node.his_id}
            Fetches.SaveNewCatalogNode(newNode).then(r=>console.log(r))
        }


    }

    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>
            <div className={cl.wrapper__name} onClick={onNameClick}>
                <span>{node.name}</span>
                <button onClick={(e: React.MouseEvent<HTMLButtonElement>) => addSubNode(e, node)}>+</button>
            </div>
            <div className={nodesClName}>
                {
                    node.nodes
                        ? node.nodes.map((chNode: CatalogNode, ind: number) => <CatalogNodeView node={chNode}

                                                                                                keyVal={keyVal + 1}
                                                                                                key={"k" + keyVal + ind}/>
                        )
                        : false
                }
            </div>
        </div>
    );
};

export default CatalogNodeView;