import React from "react";

export interface InputProps {
    value: string,
    type: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    label?: string
}