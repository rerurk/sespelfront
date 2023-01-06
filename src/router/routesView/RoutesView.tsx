import React, {FC, useState} from 'react';
// @ts-ignore
import cl from './RoutesView.module.css'
import {useNavigate} from "react-router-dom";
import {pubicRoutes, RouteNode} from "../index";


let lastItem: HTMLHeadElement | null = null


const RoutesView: FC = () => {

    const navigate = useNavigate();

    const onItemClick = (e: React.MouseEvent<HTMLDivElement>, node: RouteNode) => {
        if (lastItem) {
            lastItem.classList.remove(cl.selectedItem)

        }
        e.currentTarget.classList.add(cl.selectedItem)
        lastItem = e.currentTarget
        navigate(node.path)

    }
    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>

            {
                pubicRoutes.map((node: RouteNode, ind: number) =>
                    !node.isHide
                        ? <div
                            className={cl.wrapper_routeItem}
                            onClick={(e: React.MouseEvent<HTMLDivElement>) => onItemClick(e, node)}
                            key={node.path}>
                            <img className={cl.wrapper_routeItem_img} src={node.img}/>
                            <span className={cl.wrapper_routeItem_name}>{node.name}</span>


                        </div>
                        : false
                )

            }

        </div>
    );
};

export default RoutesView;

/*
{

}*/
