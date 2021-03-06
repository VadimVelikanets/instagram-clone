import React, {useRef, useEffect} from 'react';
import Picker from 'emoji-picker-react';

const EmojiPicker = ({onEmojiClick}) => {

    return (
        <Picker onEmojiClick={onEmojiClick}/>
    );
};

export default EmojiPicker;