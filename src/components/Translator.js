import './CSS/Translator.css';
import { useState } from "react";


function Translator() {

const [text, setText] = useState("")
const [isClick, setClick] = useState(false)

const handleOnChange=(event)=>{
setText(event.target.value)
setClick(false)
}
const onBtnClick=() =>{
setClick(true)
}    

    return (
        <div className="Translator">
            <h1> My Translator </h1>
            <div id="box">
                <fieldset >
                    <legend>What do you want to translate? </legend>
                    <div>
                        <br></br>
                        <input class="TransInput" type="text" value={text} onChange={handleOnChange} placeholder="Text to translate" ></input>
                        <br></br>
                        <br></br>
                        <button id="btn" >Translate</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <input class="TransInput" type="text" onClick={onBtnClick} placeholder="Image Output"></input>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Translator