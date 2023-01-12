import React, {FC} from 'react';
// @ts-ignore
import cl from "./RoutesView.module.css";
import {RouteNode} from "../index";
import {useNavigate} from "react-router-dom";
interface RouteBtProps {
    node: RouteNode
    onItemClick?: (e: React.MouseEvent<HTMLDivElement>, node: RouteNode)=>void
}
const RouteBt:FC<RouteBtProps> = ({node,onItemClick}) => {
    const navigate = useNavigate();
    const onBtPress=(e: React.MouseEvent<HTMLDivElement>, node: RouteNode)=>{
        if (onItemClick){
            onItemClick(e,node)

        }
        navigate(node.path)
    }
    return (
        <div
            className={cl.wrapper_routeItem}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => onBtPress(e, node)}
            key={node.path}>
            <img className={cl.wrapper_routeItem_img} src={node.img}/>
            <span className={cl.wrapper_routeItem_name}>{node.name}</span>


        </div>
    );
};

export default RouteBt;