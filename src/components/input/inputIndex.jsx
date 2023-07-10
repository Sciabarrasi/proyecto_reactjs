import React from "react";
import "./style.css"

const Input = ({placeholder, type='text', id, required=false, name, onFocus, onBlur, onChange, className}) =>{
    return(
        <div className={className}>
            <input id={id} type={type} placeholder={placeholder} required={required} onFocus={onFocus} onBlur={onBlur} onChange={onChange} />
            <label htmlFor={id}>{name}</label>
        </div>
    )
}


export default Input

