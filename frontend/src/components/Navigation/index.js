import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import MobileLogo from './mobile-logo';
import logo from './FCSP-logo.jpeg';
import desktopLogo1 from '../../FoCS-logos/logo-2-joy.png'
import desktopLogo2 from '../../FoCS-logos/logo-2-gilam.png'
import mobileLogo1 from '../../FoCS-logos/logo-3-joy.png'
import mobileLogo2 from '../../FoCS-logos/logo-3-gilam.png'
import { useAccessibilityModal, useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation';
import AccessibilityModal from '../AccessibilityModal';
import { Tooltip, TooltipRefProps } from 'react-tooltip';
import { useSelector } from 'react-redux';
import { useLogin, useLogout } from '../../context/login';
import LoginModal from '../LoginModal';
import LogoutModal from '../LogoutModal';

export default function Navigation() {
    const navigate = useNavigate();

    const [openMobileNav, setOpenMobileNav] = useState(false);
    // const [openAbout, setOpenAbout] = useState(false);
    // const [showTooltip, setShowTooltip] = useState(true);
    const { showAccessibility, setShowAccessibility } = useAccessibilityModal();
    const { accessibilitySettings, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { page, setPage } = useNavigation();
    const { showLogin, setShowLogin } = useLogin();
    const { showLogout, setShowLogout } = useLogout();

    const user = useSelector(state => state.session.user)

    const handleUser = () => {
        if (user) {
            setShowLogout(true)
        } else {
            setShowLogin(true)
        }
    }

    return (
        <div className='z-50 fixed top-0 w-full bg-white/85 px-4 md:px-20 shadow-lg lg:shadow-none '>
            <div className='flex justify-between items-center py-6 md:py-6 w-full'>
                <button onClick={() => navigate("/")} className='flex gap-2 md:gap-3 items-end h-3/5'>
                    <img src={desktopLogo1} className='hidden md:flex h-14' />
                    {/* <img src={desktopLogo2} className='hidden md:flex h-16' /> */}
                    <img src={mobileLogo1} className='md:hidden h-14' />
                    {/* <img src={mobileLogo2} className='md:hidden h-16' /> */}
                </button>

                {/* Desktop */}
                <div className='hidden lg:flex h-full'>
                    <div className='flex gap-2 mr-4'>
                        <button onClick={() => navigate("/about")} className={`font-semibold text-xl md:px-2 lg:px-4 hover:text-rose-500 ${page === "about" && "text-cyan-600"}`}>
                            About
                        </button>
                        <button onClick={() => navigate("/events")} className={`font-semibold text-xl md:px-2 lg:px-4 hover:text-rose-500 ${page === "events" && "text-cyan-600"}`}>
                            Events
                        </button>
                        <button onClick={() => navigate("/donate")} className={`font-semibold text-xl md:px-2 lg:px-4 hover:text-rose-500 ${page === "donate" && "text-cyan-600"}`}>
                            Donate
                        </button>
                        <button onClick={() => navigate("/gallery")} className={`font-semibold text-xl md:px-2 lg:px-4 hover:text-rose-500 ${page === "gallery" && "text-cyan-600"}`}>
                            Gallery
                        </button>
                        <button onClick={() => navigate("/contact")} className={`font-semibold text-xl md:px-2 lg:px-4 hover:text-rose-500 ${page === "contact" && "text-cyan-600"}`}>
                            Contact
                        </button>
                    </div>
                    <div className='border-l border-gray-300'>
                        <button onClick={() => handleUser()} className='rounded-full py-1 px-2 ml-5 text-2xl hover:bg-gray-200' title='Admin Login'>
                            {/* <i class="fa-solid fa-circle-user"></i> */}
                            <i class="fa-regular fa-circle-user"></i>
                        </button>
                    </div>
                </div>

                {/* Mobile */}
                <div className="lg:hidden z-50" id="nav-tooltip-mobile">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button onClick={() => setOpenMobileNav(!openMobileNav)} className="rounded-lg focus:bg-slate-200 p-3">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-300 transform"
                            enterFrom="opacity-0 -translate-y-full scale-95"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="transition ease-in duration-200 transform"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 -translate-y-full scale-95"
                        >
                            <Menu.Items className="fixed top-24 right-0 w-screen md:w-1/2 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-xl ring-1 ring-black/5">
                                <div className='flex flex-col border rounded-lg'>
                                    <Menu.Item>
                                        <Link to="/about" className="py-3 text-center font-semibold focus:bg-slate-200 border-b border-slate-200">About</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/events" className="py-3 text-center font-semibold focus:bg-slate-200 border-b border-slate-200">Events</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/donate" className="py-3 text-center font-semibold focus:bg-slate-200 border-b border-slate-200">Donate</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/gallery" className="py-3 text-center font-semibold focus:bg-slate-200 border-b border-slate-200">Gallery</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/contact" className="py-3 text-center font-semibold focus:bg-slate-200 border-b border-slate-200">Contact</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <button onClick={() => null} className='py-3 text-center font-semibold focus:bg-slate-200'>
                                            Login
                                        </button>
                                    </Menu.Item>
                                    {/* <Menu.Item>
                                        <button onClick={() => setShowAccessibility(true)} className="py-3 text-center focus:bg-slate-200">
                                            Accessibility
                                        </button>
                                    </Menu.Item> */}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            </div>

            {showLogin && <LoginModal />}
            {showLogout && <LogoutModal />}
        </div>
    )
}
