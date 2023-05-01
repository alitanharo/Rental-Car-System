import React, { createContext, useState, useEffect } from 'react';
import userService from '../services/userService';
import { toast } from 'react-toastify';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const decodedToken = await userService.decodeToken(token);
                const loggedInUser = await userService.getUser(token,decodedToken._id);
                setUser(loggedInUser);
            } catch (error) {
                console.log(error);
            }
        };
        checkUser();
       
    }, [token]);

    const signup = async (socialSecurityNumber, password, role) => {
        try {
            let userToken;
            userToken = await userService.signup(socialSecurityNumber, password, role);
            setToken(userToken);
            localStorage.setItem('token', userToken);
            setIsAuthenticated(true);
            const decodedToken = await userService.decodeToken(userToken);
            const loggedInUser = await userService.getUser(userToken,decodedToken._id);
            setUser(loggedInUser);
                    

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, please try again!');
        }
    };

    const login = async (socialSecurityNumber, password) => {
        try {
            let userToken;
            userToken = await userService.login(socialSecurityNumber, password);
            setToken(userToken);
            localStorage.setItem('token', userToken);
            setIsAuthenticated(true);
            const decodedToken =await userService.decodeToken(userToken);
            const loggedInUser = await userService.getUser(decodedToken._id);
            setUser(loggedInUser);


        } catch (error) {
            console.log(error);
            toast.error('Something went wrong, please try again!');
        }
    };

    const logout = async () => {
        try {
            await userService.logout();
            localStorage.removeItem('token');
            setUser(null);
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error);
        }
    };

    const userContextValue = {
        user,
        token,
        isAuthenticated,
        login,
        logout,
        signup,
    };

    return (
        <UserContext.Provider value={userContextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
