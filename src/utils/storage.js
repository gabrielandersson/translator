


export const saveStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}


export const readStorage = key => {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }

    return null;
}

export const deleteStorage = key => {
    localStorage.removeItem(key);
}