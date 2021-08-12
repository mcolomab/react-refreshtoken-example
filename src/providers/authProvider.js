import React from "react"
import { axiosInstance } from "../utils/axios"

export const AuthContext = React.createContext()

export default function AuthProvider(props) {
    const [user, setUser] = React.useState(null)

    const login = (credentials) => {
        axiosInstance.post('login', credentials)
        .then(res => res.data)
        .then(data => {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            setUser(data)
        })
        .catch(err => console.log(err))
    }

    const contextValue = {
        user,
        login
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}