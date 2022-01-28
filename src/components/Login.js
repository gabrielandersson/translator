import { useState } from "react";
import './CSS/Login.css';

function Login() {

    const [name, setName] = useState("")
    const [hasClick, setClick] = useState(false);

    // const [user, setUser]=useContext(UserContext)

    const onBtnClick = () => {
        setClick(true);
    }
    const handleChange = (event) => {
        setName(event.target.value);
        setClick(false);
    }
    return (
        <div className="Login" >
            <div >
                {/* <h4>Current User is: {user.username}</h4> */}
                <h1> My Translator </h1>
                <div id="box">

                <fieldset>
                    <legend>Enter Username</legend>
                    <div>
                        <br></br>
                        <input type="text" value={name} placeholder="Enter name" onChange={handleChange}></input>
                        <br></br>
                        <br></br>
                        <button id="btn" onClick={onBtnClick}> Continue </button>
                        {hasClick && <h2> {name} </h2>}
                    </div>
                </fieldset>
                </div>
            </div>
        </div>
    )
}
export default Login;