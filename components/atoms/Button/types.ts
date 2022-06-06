import React from "react";

export interface  ButtonProps {
    disabled?: boolean,
    btnEvent: React.MouseEventHandler<HTMLButtonElement>,
    text: string,
    className?: string
}