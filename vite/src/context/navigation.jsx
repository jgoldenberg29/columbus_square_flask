import React, { createContext, useContext, useState, useEffect } from 'react';

const NavgationContext = createContext();

export function NavigationProvider({children}) {
    const [page, setPage] = useState('home');

    return (
        <NavgationContext.Provider value={{ page, setPage }}>
            {children}
        </NavgationContext.Provider>
    );
}

export function useNavigation() {
    return useContext(NavgationContext);
};
