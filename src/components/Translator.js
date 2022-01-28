import './CSS/Translator.css';
import { useContext, useState } from "react";
import { WordsContext } from "../components/Context/WordsContext";


function Translator() {

    const [text, setText] = useState("")
    const [isClick, setClick] = useState(false)
    // const [wordlist, setWord] = useState([])
    const [wordlist, setWord] = useContext(WordsContext)

    const handleOnChange = (event) => {
        setText(event.target.value)
        setWord(event.target.value)
        setClick(false)
    }
    const onBtnClick = (event) => {
        setClick(true)
        let arr = wordlist.split('');
    }

    return (
        <div className="Translator">
            <h1> My Translator </h1>
            <div id="box">
                <fieldset >
                    <legend>What do you want to translate? </legend>
                    <div>
                        <br></br>
                        <input className="TransInput" type="text" value={text} onChange={handleOnChange} placeholder="Text to translate" ></input>
                        <br></br>
                        <br></br>
                        <button id="btn" onClick={onBtnClick}>Translate</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <input className="TransInput" type="text" placeholder="Image Output"></input>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Translator