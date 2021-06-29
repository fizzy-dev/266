import React, { createContext, useReducer, useEffect } from "react";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from 'axios'
import querystring from 'query-string'
import { authReducer } from "../reducers/authReducer";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    //ham dang nhap
    const loginUser = async loginForm => {
        try {
            console.log(loginForm);
            const response = await axios.post(`${apiUrl}/auth/login`, querystring.stringify(loginForm))
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            }

            await loadUser()
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return { success: false, message: error.message }
        }
    }

    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`${apiUrl}/auth/`)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH', payload: {
                        isAuthenticated: true,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }

    useEffect(() => loadUser(), [])

    const authContextData = { loginUser, authState }

    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContextProvider;
