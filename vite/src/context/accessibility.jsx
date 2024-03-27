import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityModalContext = createContext();
const AccessiblitySettingsContext = createContext();

export function AccessibilityProvider({children}) {
    const [showAccessibility, setShowAccessibility] = useState(false);

    // darkMode = boolean
    // textSize = boolean
    const [accessibilitySettings, setAccessibilitySettings] = useState({
        darkMode: false,
        textSize: false,
        textSpacing: false,
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem('csp-accessbility');
        if (savedSettings) {
            setAccessibilitySettings(JSON.parse(savedSettings))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('csp-accessibility', JSON.stringify(accessibilitySettings))
    }, [accessibilitySettings]);

    const { darkMode, textSize, textSpacing } = accessibilitySettings;

    const headerFormat = `${textSize ? "text-3xl" : "text-2xl"} ${darkMode ? "text-white" : null} ${textSpacing ? "tracking-wider" : null}`
    const subheaderFormat = `${textSize ? "text-2xl" : "text-xl"} ${darkMode ? "text-white" : null} ${textSpacing ? "tracking-wide" : null}`
    const contentFormat = `${textSize ? "text-lg" : null} ${darkMode ? "text-white" : null} ${textSpacing ? "tracking-wide" : null}`

    return (
        <AccessibilityModalContext.Provider value={{ showAccessibility, setShowAccessibility }}>
            <AccessiblitySettingsContext.Provider value={{ accessibilitySettings, setAccessibilitySettings, headerFormat, subheaderFormat, contentFormat }}>
                {children}
            </AccessiblitySettingsContext.Provider>
        </AccessibilityModalContext.Provider>
    );
}

export function useAccessibilityModal() {
    return useContext(AccessibilityModalContext);
}

export function useAccessibilitySettings() {
    return useContext(AccessiblitySettingsContext)
}
