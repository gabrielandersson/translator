import { useNavigate } from "react-router-dom";

const Profile = () => {
    const apiURL = 'https://trivia-game-noroff-api.herokuapp.com/translations'
    const [userProfile,setUserProfile] =useState([""])
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
            <p>{username}</p>
            <ul>

            </ul>
            <button type="button" className="btn btn-secondary" onClick={startPage}>Go back to Login</button>
        </div>

    )
}

export default Profile
