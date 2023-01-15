import React, {FC, useState} from 'react';
// @ts-ignore
import cl from './RoutesView.module.css'
import {useNavigate} from "react-router-dom";
import {RouteNode, RouterMap} from "../index";
import RouteBt from "./RouteBT";


let lastItem: HTMLHeadElement | null = null


const RoutesView: FC = () => {



    const onItemClick = (e: React.MouseEvent<HTMLDivElement>, node: RouteNode) => {
        if (lastItem) {
            lastItem.classList.remove(cl.selectedItem)

        }
        e.currentTarget.classList.add(cl.selectedItem)
        lastItem = e.currentTarget

    }
    return (
        <div className={cl.wrapper} onClick={event => event.stopPropagation()}>

            {
                Object.values(RouterMap).map((node: RouteNode, ind: number) =>
                    !node.isHide
                        ? <RouteBt node={node} onItemClick={onItemClick} key={"RouteBt_"+ind}/>
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
