import React, {FC} from 'react';
// @ts-ignore
import cl from "./Authorization.module.css"
import {useDispatch} from "react-redux";
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {AuthRes, USRAuth} from "../../structs/App";
import {Fetches} from "../../fetches/Fetches";
import {SetIsAuthState} from "../../store/action_creator/AppStoreActions";

let usr:USRAuth={
    login:"",
    pass:""
}

const Authorization:FC = () => {
    const {isAuth}=useTypeSelector(state => state.appReducer)

    const dispatch=useDispatch()
    const onSignClick=()=>{
        console.log(usr)
        Fetches.Authorization(usr).then(r=>{
            if(!(r instanceof Error)){
                let auth:AuthRes=r
                // @ts-ignore
                dispatch(SetIsAuthState(auth.is_auth))
            }
        })
    }
    const onLogChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
         usr.login=e.target.value
    }
    const onPassChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        usr.pass=e.target.value
    }

    if(!isAuth) {
        return (

            <div className={cl.wrapper}>
                <div className={cl.wrapper_fields}>
                    <input onInput={onLogChange} type={"text"} placeholder={"Login"} key={"Authorization_inp_log"} defaultValue={usr.login}/>
                    <input onInput={onPassChange} type={"password"} placeholder={"Password"} key={"Authorization_inp_pass"} defaultValue={usr.pass}/>
                    <button onClick={onSignClick}>Sign in</button>
                </div>
            </div>
        );
    }
    return (<div/>)
};

export default Authorization;