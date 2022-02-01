import { useNavigate } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import withAuth from "../../hoc/withAuth.jsx";
import { useUser } from "../../contexts/UserContext.js";
import { fetchUserById } from "../../api/user";
import { STORAGE_KEY_USER } from "../../consts/storage"
import { WordsContext } from "../../contexts/WordsContext";
import "../../css/Profile.css"
import { deleteStorage, readStorage, saveStorage } from "../../utils/storage"
import { setWord } from "../../contexts/WordsContext"

const Profile = () => {
    const { user, setUser } = useUser();
    const { wordlist, setWord } = useContext(WordsContext)
    const [ translationsList, setTranslationList ] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        const findUser = async () => {
            const [error, latestUser] = await fetchUserById(user.id);
            if (error === null) {
                saveStorage(STORAGE_KEY_USER, latestUser);
                setUser(latestUser);
            }
        }
        
        findUser()
        setTranslation()
    }, [setUser, user.id])

    const startPage = () => {

        deleteStorage(STORAGE_KEY_USER)
        setUser(null)
    }

    const clearHistory = () => {
        let index = user.translations.length - 1;
        let count = 0;
        while (count < 10 && index >= 0) {
            if (!user.translations[index].deleted) {
                user.translations[index].deleted = true;
                count++;
            }
            index--;
        }

        saveStorage(STORAGE_KEY_USER, user);
        setUser(user);
        setTranslation();
    }
    
    const setTranslation = () => {
        setTranslationList(() => {
            let index = user.translations.length - 1;
            let count = 0;
            let latestTen = [];
            while (count < 10 && index >= 0) {
                if (!user.translations[index].deleted) {
                    latestTen.push(user.translations[index].translation);
                    count++;
                }
                index--;
            }
            
            return latestTen.map((translation, index) => <li key={index}>{translation}</li>);
        });
    };

    return (
        <div className="Profile">
            <h1> My Translator profile page </h1>
            <div id="box">
                <fieldset id="welcome">
                    <legend id="welcome-legend">Welcome {user.username} </legend>
                    <br></br>
                    <div id="history-div">
                        <fieldset id="history">
                            <legend id="history-legend">Translation History</legend>
                            <ul>
                                {translationsList}
                            </ul>
                        </fieldset>

                    </div>
                    <br></br>
                    <br></br>
                    <div className="btn-div">
                        <a href="/translator">Back</a>
                        <button type="button" id="btn" onClick={startPage}>Logout</button>
                        <button type="button" id="btn" onClick={clearHistory} >Clear history</button>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default withAuth(Profile);