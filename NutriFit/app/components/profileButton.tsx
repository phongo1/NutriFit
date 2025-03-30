import { useNavigate } from "react-router";
import profile from "../assets/profile.png";

const ProfileButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/profile');
    };

    return (
        <div>
            <button 
                className="rounded hover:scale-102 transition duration-200 hover:shadow-lg cursor-pointer" 
                onClick={handleClick}
            >
                <img src={profile} className="w-[2rem]"></img>
            </button>
        </div>
    );
};

export default ProfileButton;