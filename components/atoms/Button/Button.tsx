import React from 'react';
import {ButtonProps} from "./types";

const Button = ({disabled, btnEvent, text, className}: ButtonProps) => {
    return (
        <button className={className} disabled={disabled} onClick={btnEvent}>{text}</button>
    );
};

export default Button;