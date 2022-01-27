import { useState } from "react";

const Login = () => {

    const [name, setName] = useState("")
    const [hasClick, setClick] = useState(false);

    const onBtnClick = () => {
        setClick(true);
    }
    const handleChange = (event) => {
        setName(event.target.value);
        setClick(false);
    }
    return (
        <div className="Login" >
            <div>
                <h1> My Translator </h1>
                <input type="text" value={name} placeholder="Enter name" onChange={handleChange}></input>
                <button onClick={onBtnClick}> Continue </button>
                {hasClick &&
                    <h2> {name} </h2>
                }
            </div>
        </div>
    )
}
export default Login;