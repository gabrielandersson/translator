import { createContext, useContext, useState } from "react";

//expose
const UserContext = createContext();




//provide
const UserProvider=(props)=>{
const [user, setUser] = useState(null);

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