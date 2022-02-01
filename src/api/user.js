import { createHeaders } from "./index"

export const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// The functions in this file are heavily influenced and in some cases directly mimicked  //
// from Dewalds example videos.                                                           //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////

//Gets user from api by username, returns error message if response not ok
export const lookForUser = async (username) => {
    try {
        const response = await fetch(`${apiUrl}?username=${username}`)
        if (!response.ok) {
            throw new Error("Could not complete request")
        }
        const data = await response.json();
        return [null, data];
    }
    catch (error) {
        return [error.message, []];
    }
}

//Gets user from api by Id, returns error message if response not ok
export const fetchUserById = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${userId}`)
        if (!response.ok) {
            throw new Error("Could not fetch user");
        }
        const user = await response.json();
        return [null, user];

    } catch (error) {
        return [error.message, null]
    }
}

//Updates the api of the current user with the userobject supplied 
export const clearTranslationHistory = async (user) => {
    try {
      
        const response = await fetch(`${apiUrl}/${user.id}`, {
            method: "PATCH",
            headers: createHeaders(),
            body: JSON.stringify({...user})
        })
        if (!response.ok) {
            throw new Error("could not update translations")
        }
        const result = await response.json(); 
        return[null, result]
    } catch (error) {
        return [error.message, null];
    }
}

//Creates a new user to the api
export const createUser = async (username) => {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: createHeaders(),
            body: JSON.stringify({ 
                username,
                translations: [{
                    translationtxt: "", 
                    isDeleted: false
                }]
            })
        })

        if (!response.ok) {
            throw new Error(`Could not create a new user with the name: ${username}`)
        }
        const data = await response.json();
        return [null, data];
    }
    catch (error) {
        return [error.message, []];
    }
}

//Updates the user translations-word-list with new words which the user wants to translate 
export const pushTranslation = async (user, translation) => {
    try {
        const response = await fetch(`${apiUrl}/${user.id}`, {
            method: 'PATCH',
            headers: createHeaders(),
            body: JSON.stringify({
                translations: [...user.translations, { translationtxt: translation, isDeleted: false, id: user.translations.length }]
            })
        })
        
        if (!response.ok) {
            throw new Error("Could not update translation history")
        }
        const result = await response.json();
        return [null, result];
    } catch (error) {
        return [error.message, null]
    }

}

//Checks if user already exists, if so the function returns the user object, otherwise 
// it calls on createUser to give us a new user
export const loginUser = async (username) => {

    const [checkError, user] = await lookForUser(username);

    if (checkError !== null) {

        return [checkError, null];
    }
    if (user.length > 0) {

        return [null, user.pop()];
    }

    return await createUser(username);

}
