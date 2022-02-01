import { useForm } from 'react-hook-form';
import { useState, useEffect } from "react";
import '../../css/Login.css';
import { useNavigate} from "react-router-dom";
import { loginUser } from "../../api/user"
import { saveStorage } from "../../utils/storage.js";
import { useUser } from '../../contexts/UserContext';
import { STORAGE_KEY_USER } from '../../consts/storage';

////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                        //
// The functions in this file are heavily influenced and in some cases directly mimicked  //
// from Dewalds example videos.                                                           //
//                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////

const usernameConfig = {
    required: true,
    minLength: 4
}
//The <Login /> function component starts here
function Login() {

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(null);
    const { user, setUser } = useUser();
    let navigate = useNavigate(); 
    
// Navigates user to translator page if user exists
    useEffect(() => {
        if (user !== null) {
            navigate("translator");
        }
    }, [user, navigate])


    const { register, handleSubmit, formState: { errors } } = useForm();
    
// Saves the current user to the localstorage and navigates to user to the next page = (./translation)
    const onBtnClick = async ({ username }) => {
        setLoading(true);
        const [error, userResponse] = await loginUser(username);

        if (error !== null) {
            setApiError(error);
        }
        if (userResponse !== null) {
            saveStorage(STORAGE_KEY_USER, userResponse);
            setUser(userResponse);
        }
        navigate("translator");
        setLoading(false);
    }
// Prints any type of error that may appear during sign in to the user
    const errorMessage = (() => {
        if (!errors.username) {
            return null;
        }
        if (errors.username.type === "required") {
            return <span>Username is required</span>
        }
        if (errors.username.type === "minLength") {
            return <span>Username needs to be a minimum of 4 characters</span>
        }
    })()

    return (
        <div className="Login" >
            <div >
                <h1> My Translator </h1>
                <div id="box">

                    <form onSubmit={handleSubmit(onBtnClick)}>
                        <fieldset>
                            <legend>Enter Username</legend>
                            <div>
                                <br></br>
                                <input type="text" {...register("username", usernameConfig)} placeholder="Enter username"></input>

                                <br></br>
                                <br></br>
                                <button type="submit" id="btn" disabled={loading} > Continue </button>
                                {loading &&
                                    <h2>Logging in..</h2>
                                }
                                {apiError && <p>{apiError}</p>} 
                            </div>
                            {errorMessage}
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Login;