import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import withAuth from "../../hoc/withAuth.jsx";
import { useUser } from "../../contexts/UserContext.js";
import { clearTranslationHistory, fetchUserById } from "../../api/user";
import { STORAGE_KEY_USER } from "../../consts/storage"
import { saveStorage } from "../../utils/storage"


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
        navigate("/")
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
                <fieldset >
                    <legend>Welcome {user.username} </legend>
                    <br></br>
                    <br></br>
                    <fieldset id="translationhistory">
                        <legend id="translation-legend">Translation History</legend>
                        <ul>
                            {translationsList}
                        </ul>

                        <br></br>
                    </fieldset>


                    <button type="button" id="go-back-btn" onClick={startPage}>Back to Login</button>
                    <button type="button" id="clear-history-btn" onClick={setDeleted}>Clear history</button>
                </fieldset>
            </div>
        </div>
    )
}

export default withAuth(Profile);