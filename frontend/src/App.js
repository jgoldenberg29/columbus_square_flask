import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import './App.css'
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import About from './components/About';
import { useDispatch } from "react-redux"
import { authenticate } from './store/session';
import { useAccessibilitySettings } from './context/accessibility';


const App = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState()

    const { accessibilitySettings, setAccessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <Router>
            <div className={`${darkMode && 'bg-gray-700'}`}>
                <Navigation />
                <div className={`flex-grow pt-32 md:pt-48 md:px-32`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/About" element={<About />} />
                        {/* Other routes can be added here */}
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
