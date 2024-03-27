import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

const LogoutContext = createContext();

export function LoginProvider({children}) {
    const [showLogin, setShowLogin] = useState(false);
    const [showLogout, setShowLogout] = useState(false);

    return (
        <LoginContext.Provider value={{ showLogin, setShowLogin }}>
            <LogoutContext.Provider value={{ showLogout, setShowLogout }}>
                {children}
            </LogoutContext.Provider>
        </LoginContext.Provider>
    );
}

export function useLogin() {
    return useContext(LoginContext);
};

export function useLogout() {
    return useContext(LogoutContext);
};
