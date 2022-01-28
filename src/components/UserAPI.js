const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/translations';
const apiKey = '334H7SGhAEiIPqPfCg+pfA==';

export let currentUser = null;

export async function apiUserLogin(username) {
    const user = await getUser(username);
    if (user) {
        currentUser = user;
    } else {
        const result = await createUser(username);
        currentUser = result[1];
    }

    return currentUser;
}

async function getUser(username) {
    const response = await fetch(`${apiURL}?username=${username}`);
    const data = await response.json();
    return data.find((x) => x.username === username);
}

async function createUser(username) {
    try {
        const config = {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                username,
            }),
        };

        const response = await fetch(`${apiURL}`, config);
        const data = await response.json();
        return [null, data];
    } catch (error) {
        console.log(error.message);
        return [error.message, null];
    }
}
