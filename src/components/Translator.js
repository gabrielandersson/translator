import './CSS/Translator.css';
import { useContext, useState } from "react";
import { WordsContext } from "../components/Context/WordsContext";
import { pictures } from '../images.js';

function Translator() {

    const [text, setText] = useState("")
    const [wordlist, setWord] = useContext(WordsContext)
    const [hasClick, setClick] = useState(false);
    const [images, setImages] = useState([]) 

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
        setImages([]);
        let result = [];
        let arr = wordlist.toLowerCase().split('');
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        for (let index = 0; index < arr.length; index++) {

            let position = alphabet.indexOf(arr[index]);
            result.push(pictures[position]);

            setImages(images => {
                return [...images, {
                    id: images.length,
                    value: pictures[position]
                }]
            });
        }
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
                            {hasClick &&
                                <ul >
                                    {
                                        images.map(image => {
                                            return <img key={image.id} src={image.value} alt=""></img>
                                        })
                                    }
                                </ul>
                            }
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Translator