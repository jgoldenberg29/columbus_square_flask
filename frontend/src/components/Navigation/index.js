import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import MobileLogo from './mobile-logo';
import logo from './FCSP-logo.jpeg';
import { useAccessibilityModal, useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation';
import AccessibilityModal from '../AccessibilityModal';
import { Tooltip, TooltipRefProps } from 'react-tooltip';


export default function Navigation() {
    const navigate = useNavigate();

    const [openMobileNav, setOpenMobileNav] = useState(false);
    // const [openAbout, setOpenAbout] = useState(false);
    // const [showTooltip, setShowTooltip] = useState(true);
    const { showAccessibility, setShowAccessibility } = useAccessibilityModal();
    const { accessibilitySettings, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { page, setPage } = useNavigation();


    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setShowTooltip(false)
    //     }, 8000)

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [])

    return (
        <div className='px-4 md:px-20 border-b md:border-none border-cyan-500'>
            <div className='flex justify-between items-end py-6 md:py-6'>
                <button onClick={() => navigate("/")} className='flex gap-2 md:gap-3 items-end'>
                    <img src={logo} alt='' className='h-12 w-12' />
                    <div className='hidden md:flex items-end'>
                        <h1 className='gap-1 text-4xl font-semibold text-cyan-600 tracking-tight text-end'><span className='text-5xl font-extrabold'>Friends</span> of Columbus Square</h1>
                    </div>
                    <div className='md:hidden flex flex-col justify-end items-start'>
                        <h1 className='gap-1 text-xl font-semibold text-cyan-600 tracking-tight text-end leading-3'><span className='text-2xl font-extrabold'>Friends</span> of</h1>
                        <h1 className='gap-1 text-xl font-semibold text-cyan-600 tracking-tight text-end leading-4'>Columbus Square</h1>
                    </div>
                </button>

                {/* Desktop */}
                <div className='hidden md:grid grid-cols-5 w-2/5 items-end'>
                    <button onClick={() => navigate("/about")} className={`font-semibold text-xl hover:text-rose-500 ${page === "about" && "text-cyan-700"}`}>
                        About
                    </button>
                    <button onClick={() => navigate("/events")} className={`font-semibold text-xl hover:text-rose-500 ${page === "events" && "text-cyan-700"}`}>
                        Events
                    </button>
                    <button onClick={() => navigate("/donate")} className={`font-semibold text-xl hover:text-rose-500 ${page === "donate" && "text-cyan-700"}`}>
                        Donate
                    </button>
                    <button onClick={() => navigate("/gallery")} className={`font-semibold text-xl hover:text-rose-500 ${page === "gallery" && "text-cyan-700"}`}>
                        Gallery
                    </button>
                    <button onClick={() => navigate("/contact")} className={`font-semibold text-xl hover:text-rose-500 ${page === "contact" && "text-cyan-700"}`}>
                        Contact
                    </button>
                </div>

                {/* Mobile */}
                <div className="md:hidden z-50" id="nav-tooltip-mobile">
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
                            <Menu.Items className="fixed top-20 right-0 w-screen origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                <div className='flex flex-col border '>
                                    <Menu.Item>
                                        <Link to="/about" className="py-3 text-center focus:bg-slate-200 border-b border-slate-200">About</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/events" className="py-3 text-center focus:bg-slate-200 border-b border-slate-200">Events</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/donate" className="py-3 text-center focus:bg-slate-200 border-b border-slate-200">Donate</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/gallery" className="py-3 text-center focus:bg-slate-200 border-b border-slate-200">Gallery</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/contact" className="py-3 text-center focus:bg-slate-200">Contact</Link>
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
        </div>
    )
}
