import React, {FC} from 'react';
import {Menu, MenuAction} from "./menuActions";

interface MenuItemsProps {
    hisCssClass: string
    onItemClick: (menuAction:MenuAction) => void
}

const MenuItems: FC<MenuItemsProps> = ({hisCssClass, onItemClick}) => {

    const selectMenuAction=(it:string)=>{
        // @ts-ignore
        let t=Menu[it]
        let menuAction:MenuAction={
            type:t,
            payload:null
        }
        onItemClick(menuAction)
    }


    return (
        <div className={hisCssClass} onClick={event => event.stopPropagation()}>
            {
                Object.keys(Menu).map((it: string, ind: number) =>

                    <span
                        key={Date.now() + ind}
                        onClick={()=>selectMenuAction(it)}
                    >

                        {
                            // @ts-ignore
                            Menu[it]
                        }

                    </span>)
            }
        </div>
    );
};

export default MenuItems;