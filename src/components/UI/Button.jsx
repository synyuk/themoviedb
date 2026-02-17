import React from 'react';
import {useState} from 'react';

function Button(name){
    const [counter, setCounter] = useState(0);
    const [nameButton, setNameButton] = useState(name.name);
    function handleClick() {
        setCounter(counter + 1);
        console.log(nameButton);
    }
    return <button onClick={handleClick}>{name.name}</button>
}

export default Button;