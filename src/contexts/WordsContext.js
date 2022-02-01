import { createContext, useState } from "react";

export const WordsContext = createContext();

//provides a state manager for the user translations
const WordsProvider = (props) => {
    const [wordlist, setWord] = useState([])

    return (
        <WordsContext.Provider value={[wordlist, setWord]}>
            {props.children}
        </WordsContext.Provider>
    );
};

export default WordsProvider;