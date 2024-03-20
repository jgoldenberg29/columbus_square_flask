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
import Contact from './components/Contact';
import Events from './components/Events';
import { getAllEvents } from './store/events';
import { getAllNews } from './store/news';
import fetchAll, { thunkGetAllData } from './store/allData';
import Gallery from './components/Gallery';
import News from './components/News'
import Donate from './components/Donate';
import LoginModal from './components/LoginModal';
import LogoutModal from './components/LogoutModal';
import { useLogin, useLogout } from './context/login';
import Dashboard from './components/Dashboard';

const App = () => {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState()

    const { showLogin, setShowLogin } = useLogin();
    const { showLogout, setShowLogout } = useLogout();

    const { accessibilitySettings, setAccessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true))
        dispatch(thunkGetAllData())
        // dispatch(fetchAll(dispatch, getAllEvents, getAllNews)).then(() => console.log('Fetched All'))
    }, [dispatch])

    return (
        <Router>
            <div className="">
                {showLogin && <LoginModal />}
                {showLogout && <LogoutModal />}
                <Navigation />
                <div className={`mt-[120px] min-h-screen`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/donate" element={<Donate />} />
                        <Route path='/gallery' element={<Gallery />} />
                        <Route path='/news' element={<News />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
