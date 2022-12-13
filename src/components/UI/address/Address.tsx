import React, {FC, useEffect, useState} from 'react';
// @ts-ignore
import cl from "./Adress.module.css"
import {EmptyField} from "../../assetsStores/StoreView";

export type TAddress = {
    reg_ind:string,
    region: string,
    district: string
    city: string,
    street: string,
    building: string,
    phone: string
}


interface AddressProps {
    address: TAddress
    // для обратноц реакции React input нужно менять key
    keyPref:string
    isDisable:boolean
}
let a: TAddress
export function GetAddress():TAddress{
    return a
}



const Address: FC<AddressProps> = ({address,isDisable,keyPref}) => {
    const [add, setAdd] = useState<TAddress>(address)

    useEffect(() => {
        checkAddressFields()
    }, [])

    function checkAddressFields() {
        a= JSON.parse(JSON.stringify(address))
        Object.keys(a).forEach((key: string) => {
                // @ts-ignore
                if (a[key] == "" || a[key] === 0) {
                    // @ts-ignore
                    a[key] = EmptyField
                }
            }
        )
        setAdd(() => a)
    }



    const onFieldClick = (e: React.MouseEvent<HTMLInputElement>) => {

        if (e.currentTarget.value == EmptyField) {
            e.currentTarget.value = ""
        }
    }

    const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        // @ts-ignore
        a[e.target.name] = e.target.value


    }


    return (
        <div className={cl.wrapper}>
            <div className={cl.wrapper_field}>
                <label>Индекс</label>
                <input key={"reg_ind"+keyPref}
                    type="text" name="reg_ind" defaultValue={add.reg_ind} onChange={event => onFieldChange(event)}
                       disabled={isDisable}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Регион</label>
                <input
                    key={"region"+keyPref}
                    type="text" name="region" defaultValue={add.region} onChange={event => onFieldChange(event)}
                       onClick={event => onFieldClick(event)} disabled={isDisable}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Район</label>
                <input
                    key={"district"+keyPref}
                    type="text" name="district" defaultValue={add.district} onChange={event => onFieldChange(event)}
                       onClick={event => onFieldClick(event)} disabled={isDisable}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Город</label>
                <input type="text" key={"city"+keyPref} name="city" defaultValue={add.city} onChange={event => onFieldChange(event)}
                       onClick={event => onFieldClick(event)} disabled={isDisable}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Улица</label>
                <input type="text" key={"street"+keyPref} name="street" defaultValue={add.street} onChange={event => onFieldChange(event)}
                       onClick={event => onFieldClick(event)} disabled={isDisable}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Дом</label>
                <input type="text" key={"building"+keyPref} name="building" defaultValue={add.building} onChange={event => onFieldChange(event)}
                       onClick={event => onFieldClick(event)} disabled={isDisable}/>
            </div>
            <div className={cl.wrapper_field}>
                <label>Телефон</label>
                <input type="text" key={"phone"+keyPref} name="phone" defaultValue={add.phone} onChange={event => onFieldChange(event)}
                       onClick={event => onFieldClick(event)} disabled={isDisable}/>
            </div>




        </div>

    );
};

export default Address;