import React from "react";

export interface InputProps {
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    label?: string
}