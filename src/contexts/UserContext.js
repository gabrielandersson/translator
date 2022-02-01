import { createContext, useContext, useState } from "react";
import { STORAGE_KEY_USER } from "../consts/storage";
import { readStorage } from "../utils/storage";




const UserContext = createContext();

//provides a state manager for the user
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

//custom hook that Dewald uses in his example videos to supply a context 
export const useUser = () => {
    return useContext(UserContext)
}


export default UserProvider;