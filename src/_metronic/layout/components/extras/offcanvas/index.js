import { Redirect } from "react-router";

export const isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("User")) {
        return JSON.parse(localStorage.getItem("User"));
    } else {
        return false;
    }
};
export const logout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("User");
        localStorage.removeItem("ACCESS_TOKEN_KEY");
        console.log('1')
        window.location.href = '/'
    }
};