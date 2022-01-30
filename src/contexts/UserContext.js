import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../consts/storage";
import { readStorage } from "../utils/storage";

//expose
const UserContext = createContext();




//provides a state manager for user
const UserProvider=(props)=>{
const [user, setUser] = useState(readStorage(STORAGE_KEY_USER));

const state = {
    user, setUser
}

return(
    <UserContext.Provider value={state}>
        {props.children}
    </UserContext.Provider>
);
};

export const useUser = () => {
    return useContext(UserContext)
}


export default UserProvider;