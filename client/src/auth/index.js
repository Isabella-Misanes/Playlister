import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    INCORRECT_LOGIN: "INCORRECT_LOGIN",
    INCORRECT_SIGNUP: "INCORRECT_SIGNUP",
    INCOMPLETE_CREDS: "INCOMPLETE_CREDS"
}

const CurrentModal = {
    NONE: "NONE",
    BAD_LOGIN: "BAD_LOGIN",
    BAD_SIGNUP: "BAD_SIGNUP",
    BAD_CREDS: "BAD_CREDS"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        currentModal: CurrentModal.NONE
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    currentModal: CurrentModal.NONE
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    currentModal: CurrentModal.NONE
                })
            }
            case AuthActionType.INCORRECT_LOGIN: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.BAD_LOGIN
                })
            }
            case AuthActionType.INCORRECT_SIGNUP: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.BAD_SIGNUP
                })
            }
            case AuthActionType.INCOMPLETE_CREDS: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.BAD_CREDS
                })
            }
            case AuthActionType.HIDE_MODAL: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    currentModal: CurrentModal.NONE
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
        else if(response.status === 204) {
            auth.showBadCredsModal();
        }
        else {
            auth.showBadSignupModal();
        }
    }

    auth.loginUser = async function(email, password) {
        console.log("Login user");
        const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/");
        }
        else if(response.status === 201) {
            auth.showBadCredsModal();
        }
        else {
            auth.showBadLoginModal();
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.showBadLoginModal = () => {
        authReducer({
            type: AuthActionType.INCORRECT_LOGIN,
            payload: {}
        });  
    }

    auth.hideBadLoginModal = () => {
        authReducer({
            type: AuthActionType.HIDE_MODAL,
            payload: {}
        });
    }

    auth.showBadSignupModal = () => {
        authReducer({
            type: AuthActionType.INCORRECT_SIGNUP,
            payload: {}
        });  
    }

    auth.hideBadSignupModal = () => {
        authReducer({
            type: AuthActionType.HIDE_MODAL,
            payload: {}
        });
    }

    auth.showBadCredsModal = () => {
        authReducer({
            type: AuthActionType.INCOMPLETE_CREDS,
            payload: {}
        });  
    }

    auth.hideBadCredsModal = () => {
        authReducer({
            type: AuthActionType.HIDE_MODAL,
            payload: {}
        });
    }

    auth.isBadLoginModalOpen = () => {
        return auth.currentModal === CurrentModal.BAD_LOGIN;
    }
    auth.isBadSignupModalOpen = () => {
        return auth.currentModal === CurrentModal.BAD_SIGNUP;
    }
    auth.isBadCredsModalOpen = () => {
        return auth.currentModal === CurrentModal.BAD_CREDS;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };