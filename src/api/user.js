import { useUser } from "../contexts/UserContext";
import { createHeaders } from "./index"

export const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

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

export const fetchUserById = async (userId) => {
    try {
        const response = await fetch(`${apiUrl}/${user.id}`, {
            method: 'PATCH',
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                translations: ["hej"]
            })
        });
        if (!response.ok) {
            throw new Error("Could not fetch user");
        }
        let user = await response.json();
        user.translations = user.translations.map(x => ({ translation: x, deleted: false }));
        return [null, user];

    } catch (error) {
        return [error.message, null]
    }
}

export const createUser = async (username) => {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                translations: []
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

export const pushTranslation = async (user, translation) => {
    try {
        const response = await fetch(`${apiUrl}/${user.id}`, {
            method: 'PATCH',
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                translations: [ ...user.translations.map(x => x.translation), translation ]
            })
        })
        
        if (!response.ok) {
            throw new Error("Could not update translation history")
        }
        let result = await response.json();
        result.translations = result.translations.map(x => ({ translation: x, deleted: false }));
        return [null, result];
    } catch (error) {
        return [error.message, null]
    }

}

export const loginUser = async (username) => {

    const [checkError, users] = await lookForUser(username);

    if (checkError !== null) {

        return [checkError, null];
    }
    if (users.length > 0) {
        let user = users.pop();
        user.translations = user.translations.map(x => ({ translation: x, deleted: false }));

        return [null, user];
    }

    return await createUser(username);

}
