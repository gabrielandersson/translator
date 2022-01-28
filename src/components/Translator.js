import './CSS/Translator.css';


function Translator() {




    

    return (
        <div className="Translator">
            <h1> My Translator </h1>
            <div id="box">
                <fieldset >
                    <legend>What do you want to translate? </legend>
                    <div>
                        <br></br>
                        <input class="TransInput" type="text" placeholder="Text to translate"></input>
                        <br></br>
                        <br></br>
                        <button id="btn" >Translate</button>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <input class="TransInput" type="text" placeholder="Image Output"></input>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default Translator