export const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/translations';
const apiKey = '334H7SGhAEiIPqPfCg+pfA==';

async function login(username) {
    const response = await fetch(`${apiURL}?username=${username}`);
    const data = await response.json();
    return data.find((x) => x.username === username);
}

export let currentUser = null;

export async function loginAPI(username) {
    const user = await login(username);
    if (user) {
        currentUser = user;
    } else {
        const result = await createUser(username);
        currentUser = result[1];
    }

    return currentUser;
}

async function createUser(username) {
    const response = await fetch(`${apiURL}`,
        {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, translations: [] }),
        }
    )
    const data = await response.json();
    return [null, data];

}
