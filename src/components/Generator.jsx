import React, { useEffect, useRef, useState } from 'react'

export default function Generator() {
    const [password, setPassword] = useState('');
    const [includeNumber, setIncludeNumber] = useState(false);
    const [includeSym, setIncludeSym] = useState(false);
    const [length, setLength] = useState(8);

    const inputTextRef = useRef('');

    function generatePassword(){
        let newPassword = '';
        let tempString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        if(includeNumber) tempString += '0123456789';
        if(includeSym) tempString+= '@#$*()';

        for(let i=0; i<length; i++){
            newPassword += tempString.charAt(Math.floor((Math.random() * tempString.length) + 1));
        }

        setPassword(newPassword);
    }

    function copyPasswordToClipboard(){
        inputTextRef.current?.select();
        window.navigator.clipboard.writeText(password);
        console.log('Password coppied.');
    }

    //console.log('Rendered.');

    useEffect(()=>{
        generatePassword();
    },[length, includeNumber, includeSym]);

  return (
    <div className='generatorContainer'>
        <h1>Password Generator</h1>
        <div className='input-group'>
            <input type="text" value={password} placeholder='password'  readOnly ref={inputTextRef} />
            <button onClick={copyPasswordToClipboard} className='btn-copy'>
                copy
            </button>
                
        </div>
        <div>
            <label>
                <input type="range" min={6} max={25} value={length} onChange={(e) => {setLength(e.target.value); }} />
                Length: {length}
            </label>
            <label >
                <input type="checkbox"  defaultChecked={includeNumber} 
                onClick={()=>{
                    setIncludeNumber((pre)=>!pre);
                }} />
                Charactor
            </label>
            <label >
                <input type="checkbox" defaultChecked={includeSym}
                onClick={()=>{
                    setIncludeSym((pre)=>!pre);
                }} />
                Symbol
            </label>
        </div>
    </div>
  )
}
