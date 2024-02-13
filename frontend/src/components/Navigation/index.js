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

    // const [openMobileNav, setOpenMobileNav] = useState(false);
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
        <div className='px-20'>
            {/* Desktop */}
            <div className='flex justify-between items-end py-6'>
                <button onClick={() => {}} className='flex gap-3 items-end'>
                    <img src={logo} alt='' className='h-12 w-12' />
                    <h1 className='text-4xl font-semibold text-cyan-600 tracking-tight text-end'><span className='text-5xl font-extrabold'>Friends</span> of Columbus Square</h1>
                </button>
                <div className='hidden md:grid grid-cols-5 w-2/5 items-end'>
                    <button onClick={() => {}} className='font-semibold text-xl  hover:text-rose-500'>
                        About
                    </button>
                    <button onClick={() => {}} className='font-semibold text-xl  hover:text-rose-500'>
                        Events
                    </button>
                    <button onClick={() => {}} className='font-semibold text-xl  hover:text-rose-500'>
                        Donate
                    </button>
                    <button onClick={() => {}} className='font-semibold text-xl  hover:text-rose-500'>
                        Gallery
                    </button>
                    <button onClick={() => {}} className='font-semibold text-xl  hover:text-rose-500'>
                        Contact
                    </button>
                </div>
            </div>

            {/* Mobile */}

        </div>
    )
}
