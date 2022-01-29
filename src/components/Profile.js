import { useNavigate } from "react-router-dom";
import UserList from "../components/UserList";
import { useState } from "react";

const Profile = () => {
    // const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/translations'
    const [userProfile, setUserProfile] = useState([{
        id: 1,
        username: "kitt",
        translations: [
            "hello world",
            "react is fun"
        ]
    }])
    const navigate = useNavigate();

    const startPage = () => {
        navigate("/")
    }

    // async function getUser(id) {
    //     const response = await fetch(`${apiURL}/${id}`);
    //     const data = await response.json();
    //     setUserProfile((data));
    //     console.log(data);
    // }




    return (
        <div className="Profile">
            <h1> My Translator </h1>
            <div id="box">
                <fieldset >
                    <legend>Your latest translations </legend>
                    {/* <UserList userProfile={userProfile} /> */}
                    {userProfile.map((user) => (
                        <div className="user-preview" key={user.id}>
                            <p>{user.username}</p>
                            <p>{user.translations}</p>
                        </div>
                    ))}
                    <button type="button" id="btn" onClick={startPage}>Back to Login</button>
                </fieldset>
            </div>
        </div>
    )
}

export default Profile