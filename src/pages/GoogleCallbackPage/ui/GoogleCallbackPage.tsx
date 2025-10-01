import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const GoogleCallbackPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        const user = params.get("user") ? JSON.parse(params.get("user")!) : null

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
        }
        if (refreshToken) {
            localStorage.setItem("refreshToken", refreshToken);
        }
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }

        navigate("/");
    }, []);

    return <div>Авторизация через Google...</div>;
};

export default GoogleCallbackPage;