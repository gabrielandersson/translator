import UserProvider from "./UserContext"

// Wraps UserProvider into AppContext
const AppContext = ({ children}) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    )
}
export default AppContext