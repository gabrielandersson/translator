import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import withAuth from "../../hoc/withAuth.jsx";
import { useUser } from "../../contexts/UserContext.js";
import { clearTranslationHistory, fetchUserById } from "../../api/user";
import { STORAGE_KEY_USER } from "../../consts/storage"
import "../../css/Profile.css"
import { deleteStorage, saveStorage } from "../../utils/storage"



const Profile = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

//The functionality inside this useEffect is an application of how Dewalds made his coffe orders sync with 
// both the local storage and the changes made in the api. 
// When the latest user is fetched from the api we update the localstorage with it and likewise with the useState hook 
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

// Clears Localstorage
    const startPage = () => {
        deleteStorage(STORAGE_KEY_USER)
        setUser(null)
    }

// Redirects to translator page
    const translationPage=()=>{
        navigate("translator")
    }
    
//We made the choice to delete all of the users translation history when the button is clicked
// the records are not directly destroyed on the api but a isDeleted prop is set on the translation object.
// Since this might be interpreted as quite a destructive command we added a confirm prompt, 
// thus making sure to inform the user of the implications of proceeding.
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
    //Here we first filter on isDeleted === false and making sure the string is not empty
    // Since we use ternarys here we use the notNullFilterslist to weed ut the nulls that inevitably will populate the first list
    // Then we cap the list to ten with a shallow copy.
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
                        <button type="button" id="btn" onClick={setDeleted}>Clear history</button>
                        <button type="button" id="btn" onClick={translationPage}>Back</button>
                    </div>
                </fieldset>
            </div>
        </div>
    )
}

export default withAuth(Profile);