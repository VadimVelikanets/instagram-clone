import React from "react";

export interface AddPostTextFormProps {
    description: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    placeholder: string,
    addEmoji: (event: React.ChangeEventHandler<HTMLInputElement>, emojiObject: object) => void
}