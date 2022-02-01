

//Saves a user to the local storage this is mimicked from Dewalds example videos
//On a more practical level the object values get converted to strings
export const saveStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

//This function fetches the user from the localstorage and parses the string into an object again
export const readStorage = key => {
    const data = localStorage.getItem(key);
    if(data){
        return JSON.parse(data);
    }

    return null;
}

//This function deletes the user from localstorage
export const deleteStorage= key =>{
    localStorage.removeItem(key);
}