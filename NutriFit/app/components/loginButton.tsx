import { useNavigate } from "react-router";

const LoginButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    };

    return (
        <div>
            <button 
                className="bg-[var(--color-accent)] text-white font-bold py-2 px-4 rounded hover:scale-105 transition duration-200 shadow-md hover:shadow-lg cursor-pointer" 
                onClick={handleClick}
            >
                Login
            </button>
        </div>
    );
};

export default LoginButton;