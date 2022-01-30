import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import withAuth from "../../hoc/withAuth.jsx";
import { useUser } from "../../contexts/UserContext.js";
import { fetchUserById } from "../../api/user";
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

    const latestTen = [];
    if (user.translations.length > 10) {

        for (let index = 0; index < 10; index++) {
            latestTen.push(user.translations[(user.translations.length - 1) - index]);
        }
    }
    if(user.translations.length < 10){
        for (let index = 0; index < user.translations.length; index++) {
            latestTen.push(user.translations[(user.translations.length -1) - index]); 
        }
    }
    
    const translationsList = latestTen.map((translation, index) => <li key={index}>{translation}</li>);

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
                    <button type="button" id="clear-history-btn" onClick={startPage}>Clear history</button>
                </fieldset>
            </div>
        </div>
    )
}

export default withAuth(Profile);