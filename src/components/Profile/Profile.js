import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { apiUrl } from "../../api/user.js";

const Profile = () => {
    // const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/translations'
  
    const [userData, setUserData] = useState([]);
    const [id, setId] = useState(1);

    useEffect(() => {
     fetch(`https://trivia-game-noroff-api.herokuapp.com/translations/`)
     .then(response => response.json())
     .then(data => {
         console.log(data[0])
         setUserData({
            id: data[0].id,
            name: data[0].username,
            translations: data[0].translations
         });
     }) 
      }, [id]);

  const userProfile = (userMeta) => {
      const  {
          id: {id},
          name: {username},
          translations: {translations}
      } = userMeta;
  }
    

    const navigate = useNavigate();

    const startPage = () => {
        navigate("/")
    }

    async function getUser(id) {
        const response = await fetch(`${apiUrl}/${id}`);
        const data = await response.json();
       
    }




    return (
        <div className="Profile">
            <h1> My Translator </h1>
            <div id="box">
                <fieldset >
                    <legend>Your latest translations </legend>
                    {/* <UserList userProfile={userProfile} /> */}
                    {userData.map(user => (
                        <div className="user-preview" key={user.id}>
                            <p>{user}</p>
                            
                        </div>
                    ))}
                    <button type="button" id="btn" onClick={startPage}>Back to Login</button>
                </fieldset>
            </div>
        </div>
    )
}

export { Profile }