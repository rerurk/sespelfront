import React, {FC, useState} from 'react';
// @ts-ignore
import cl from "./InputText.module.css"

interface InputTextProps {

}

const InputText: FC<InputTextProps> = () => {
    const [isShow, setIsShow] = useState<boolean>(true)


    function show() {
        setIsShow(() => !isShow)
    }

    return (
        <div
            className={isShow ? cl.wrapper : [cl.wrapper, cl.wrapper_hide].join(" ")}
            onClick={() => setIsShow(!isShow)}
        >

            <div className={cl.wrapper_content}>
                <input/>
                <div className={cl.wrapper_content_bts}>
                    <button>да</button>
                    <button>нет</button>
                </div>
            </div>
        </div>
    );
};

export default InputText;