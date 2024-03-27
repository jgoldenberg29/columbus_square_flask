import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import LoginModal from '../LoginModal';
import { useLogin, useLogout } from '../../context/login';
import LogoutModal from '../LogoutModal';

export default function Footer() {
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
        <div className="w-full border-t border-2">
            <div className='flex flex-col md:flex-row justify-center md:justify-evenly px-8 py-12 gap-16 md:gap-0'>
                {/* <div className='flex flex-col max-w-80 gap-3 px-3'>
                    <h2 className='text-yellow-300 text-2xl font-newspaper'>About</h2>
                    <p className='text-white pr-3'>Columbus Square Park is a vibrant community gathering place located between 12th and 13th Streets and Wharton and Reed streets in the Passyunk Square neighborhood in South Philadelphia.</p>
                </div> */}
                <div className='flex flex-col gap-3 px-3'>
                    <h2 className='text-2xl font-newspaper'>Contact</h2>
                    <div>
                        <div className='flex gap-3 mb-2 content-end items-center'>
                            <i class="fa-solid fa-phone"></i>
                            (215) 685-1590
                        </div>
                        <div className='flex gap-3 mb-2 content-end items-center'>
                            <i class="fa-solid fa-envelope"></i>
                            friends@columbussquare.org
                        </div>
                        <div className='flex gap-3 mb-2 content-end items-center'>
                            <i class="fa-brands fa-facebook"></i>
                            <Link to="https://www.facebook.com/friendsofcolumbussquare/" className='hover:underline'>Join us on Facebook!</Link>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3 px-3'>
                    <h2 className='text-2xl font-newspaper'>Related Links</h2>
                    <div className='text-blue-500 flex flex-col'>
                        <Link to="https://www.phila.gov/departments/philadelphia-parks-recreation/" className='mb-2 underline hover:no-underline'>Philadelphia Parks & Recreation</Link>
                        <Link to="https://www.facebook.com/groups/241921246469738/" className='mb-2 underline hover:no-underline'>South Philadelphia Dog Owners Association (SPDOA)</Link>
                        <Link to="https://www.drpipes.com/pa/philadelphia.html" className='mb-2 underline hover:no-underline'>Plumbers Near Philadelphia</Link>
                    </div>
                </div>
                <div className='flex flex-col gap-3 px-3'>
                    <h2 className='text-2xl font-newspaper'>Admin</h2>
                    <button onClick={() => handleUser()} className={`py-2 px-4 md:px-8 text-white rounded-lg ${user ? 'bg-rose-500' : 'bg-cyan-500'} ${user ? 'hover:bg-rose-400' : 'hover:bg-cyan-400'} ${user ? 'active:bg-rose-300' : 'active:bg-cyan-300'}`}>
                        {user ? "Log Out" : "Log In"}
                    </button>
                </div>
            </div>

            {/* {showLogin && <LoginModal />}
            {showLogout && <LogoutModal />} */}
        </div>
    )
}
