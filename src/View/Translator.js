import './CSS/Translator.css';
import { useContext, useState } from "react";
import { WordsContext } from "../Components/Context/WordsContext";
import picture from "../assets/signs/a.png";
import { pictures } from '../images.js';

function Translator() {

    const [text, setText] = useState("")

    // const [wordlist, setWord] = useState([])
    const [wordlist, setWord] = useContext(WordsContext)
    const [hasClick, setClick] = useState(false);
    const [translatedImg, setImg] = useState([])   //here we try to store our image translations

    const handleOnChange = (event) => {
        setText(event.target.value)
        setWord(event.target.value)
        setClick(false)
    }
    const onBtnClick = (event) => {
        setClick(true)
            translate()

    }

    const translate = () => {
        let result = [];
        let arr = wordlist.split('');
        const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; 
        
           
        for (let index = 0; index < arr.length; index++) {
            
            let position = alphabet.indexOf(arr[index].toLowerCase());
            result.push(pictures[position]);

        }

        // PROBLEM HERE - we try to store our result array within a useState hook but when we try to log it out it returns empty.
        console.log(result);
        setImg(result);
         console.log(translatedImg);
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
                        <div id="divBox">
                            {hasClick && <img src={translatedImg}></img>}

                        </div>
                        {/* <input className="TransInput" type="text " placeholder="Image Output"></input> */}
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Translator