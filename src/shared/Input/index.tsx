import React from 'react';
import styles from './styles.module.scss';

const CustomInput = ({type, name, value, onChange, placeholder = ' '}: {type: string, name: string, value:string, onChange: void, placeholder?: string}) => {

    const onChangeHandler = (e: any) => {
        // @ts-ignore
        onChange && onChange(e.targe.value)
    }

    return (
        <div className={styles.input}>
            <input type={type} name={name} value={value} onChange={onChangeHandler} placeholder={placeholder}/>
        </div>
    );
};

export default CustomInput;