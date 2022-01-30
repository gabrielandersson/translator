import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";


//gets user from our state and if none exists redirects to the login page
const withAuth = Component => props => {
    const { user } = useUser();
    if (user !== null) {
        return <Component {...props} />
    }else {
        return <Navigate to="/" /> 
    }
}

export default withAuth;