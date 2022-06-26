import React, {useRef, useEffect} from 'react';
import Picker from 'emoji-picker-react';
import data from '@emoji-mart/data'

const EmojiPicker = ({onEmojiClick}) => {

    return (
        <Picker onEmojiClick={onEmojiClick}/>
    );
};

export default EmojiPicker;