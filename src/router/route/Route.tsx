import React, {FC} from 'react';
// @ts-ignore
import cl from './Rote.module.css'
import {useNavigate} from "react-router-dom";
import {publicRoutes, RouteNode} from "../index";

let routes = publicRoutes
let lastItem:HTMLHeadElement|null=null
const Route: FC = () => {
    const navigate = useNavigate();

    const onItemClick = (e: React.MouseEvent<HTMLHeadElement>, node: RouteNode) => {
        if(lastItem){
            lastItem.classList.remove(cl.selectedItem)

        }
        e.currentTarget.classList.add(cl.selectedItem)
        lastItem=e.currentTarget
        navigate(node.path)
    }
    return (
        <div className={cl.wrapper}>
            {
                routes.map((node: RouteNode, ind: number) => <span
                    className={node.isHide?cl.hidden_item:cl.defItem}
                    onClick={(e: React.MouseEvent<HTMLHeadElement>) => onItemClick(e, node)}
                    key={"r" + ind}>{node.name}</span>)
            }
        </div>
    );
};

export default Route;