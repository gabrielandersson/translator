import { useForm } from 'react-hook-form';
import { useState } from "react";
import '../../css/Login.css';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/user"

const usernameConfig = {
    required: true,
    minLength: 4
}

function Login() {

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let navigate = useNavigate();


    const onBtnClick = async ({ username }) => {
        setLoading(true);
        const [error, user] = await loginUser(username);
        console.log("Error", error);
        console.log("User", user);
        let path = 'translator';

        navigate(path);
        setLoading(false);
    }

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
                                <input type="text" {...register("username", usernameConfig)} placeholder="Enter user name"></input>

                                <br></br>
                                <br></br>
                                <button type="submit" id="btn" disabled={ loading } > Continue </button>
                                {loading &&
                                    <h2>Logging in..</h2>
                                }
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