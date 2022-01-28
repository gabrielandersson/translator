import { useNavigate } from "react-router-dom";

const Profile = () => {
    const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/translations'
    const [userProfile, setUserProfile] = useState([""])
    const navigate = useNavigate();

    const startPage = () => {
        navigate("/")
    }

    async function getUser(id) {
        const response = await fetch(`${apiURL}/${id}`);
        const data = await response.json();
        setUserProfile((data))
    }




    return (
        <div>
            <fieldset >
                <legend>Your latest translations </legend>
                    <div id="divBox">
                    <p></p>
                    <button type="button" className="btn" onClick={startPage}>Back to Login</button>
                    </div>
            </fieldset>

        </div>

    )
}

export default Profile
