import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import withAuth from "../../hoc/withAuth.jsx";
import { useUser } from "../../contexts/UserContext.js";
import { clearTranslationHistory, fetchUserById } from "../../api/user";
import { STORAGE_KEY_USER } from "../../consts/storage"
import "../../css/Profile.css"
import { deleteStorage, readStorage, saveStorage } from "../../utils/storage"



const Profile = () => {
    const { user, setUser } = useUser();
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
    }, [setUser, user.id])


    const startPage = () => {

        deleteStorage(STORAGE_KEY_USER)
        setUser(null)
    }

    const setDeleted = async () => {
       
            if (window.confirm("Are you sure? Clicking this button will delete all of your translation history")) {
            if (user.translations.length > 1) {
                for (let index = 1; index < user.translations.length; index++) {
                    user.translations[user.translations.length - index].isDeleted = true;
                }
                const [clearerror, clearResult] = await clearTranslationHistory(user, user.translations)
                if (clearerror !== null) console.log(clearerror);
             
                saveStorage(STORAGE_KEY_USER, clearResult);
                setUser(clearResult);
            }
        }
    }
    
    const firstFilterList = [...user.translations].reverse().map(translation => { return !translation.isDeleted && translation.translationtxt.length > 0 ? translation : null })
    const notNullFilterList = firstFilterList.filter(x => !!x);
    const cappedReverseList = notNullFilterList.slice(0, 10);

    const translationsList = cappedReverseList.map((translation, index) => { return !translation.isDeleted && translation.translationtxt.length > 0 ? <li key={index}>{translation.translationtxt}</li> : null });

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
                        <button type="button" id="btn" onClick={startPage}>Logout</button>
                        <button type="button" id="btn" onClick={clearHistory}>Clear history</button>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default withAuth(Profile);