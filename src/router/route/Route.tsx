import React, {FC, useState} from 'react';
// @ts-ignore
import cl from './Rote.module.css'
import {BrowserRouter, useNavigate} from "react-router-dom";
import {publicRoutes, RouteNode} from "../index";
import ChangeFontSize from "../../components/UI/cahngeFontSize/ChangeFontSize";

let routes = publicRoutes
let lastItem:HTMLHeadElement|null=null


const Route: FC = () => {
    const navigate = useNavigate();

    const [showClass,setShowClass]=useState<string[]>([cl.wrapper,cl.wrapper_hide])
    const [isRoutesShow,setIsRoutesShow]=useState<boolean>(false)
    const  onClickShowRotes=()=>{
        if(isRoutesShow){
            setShowClass([cl.wrapper,cl.wrapper_hide])
        }else {
            setShowClass([cl.wrapper,cl.wrapper_show])
        }
        setIsRoutesShow(!isRoutesShow)
    }
    const onItemClick = (e: React.MouseEvent<HTMLDivElement>, node: RouteNode) => {
        if(lastItem){
            lastItem.classList.remove(cl.selectedItem)

        }
        e.currentTarget.classList.add(cl.selectedItem)
        lastItem=e.currentTarget
        navigate(node.path)
        onClickShowRotes()
    }
    return (
        <div className={showClass.join(" ")} onClick={event => event.stopPropagation()}>
            <div className={cl.wrapper_showRoutes_BT} onClick={onClickShowRotes}>&#x2630;</div>

            {
                routes.map((node: RouteNode, ind: number) =>
                    <div
                    className={cl.wrapper_routeItem}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => onItemClick(e, node)}
                    key={"r" + ind}>{node.name}
                    </div>)
            }
            <ChangeFontSize/>
        </div>
    );
};

export default Route;