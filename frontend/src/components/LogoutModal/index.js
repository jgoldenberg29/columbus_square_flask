import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useLogout } from '../../context/login';
import { useAccessibilitySettings } from '../../context/accessibility';
import { login, logout } from '../../store/session';
import {useDispatch} from 'react-redux'

export default function LogoutModal() {
    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const dispatch = useDispatch()
    const { showLogout, setShowLogout } = useLogout();

    const handleLogout = () => {
        dispatch(logout())
        setShowLogout(false)
        return;
    }

    return (
        <Transition appear show={showLogout} as={Fragment}>
            <Dialog as="div" className="fixed z-[100]" onClose={() => setShowLogout(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={`fixed inset-0 ${darkMode ? "bg-white/25" : "bg-black/25"}`} />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl ${darkMode ? "bg-gray-700" : "bg-white"} p-6 text-left align-middle shadow-xl transition-all`}>
                        <Dialog.Title
                            as="h1"
                            className={`${darkMode ? "text-white" : null} ${textSize ? "text-2xl" : "text-xl"} leading-6 text-gray-900`}
                        >
                            Admin Logout
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className={`${textSize ? "text-base pt-2" : "text-sm"} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Are you sure you want to log out?
                            </p>
                        </div>
                        <div className="mt-6 flex flex-col gap-4">
                            <button onClick={() => handleLogout()} className='rounded-lg bg-primary hover:bg-secondary active:bg-slate-200 px-6 py-2'>
                                Log Out
                            </button>
                            <button onClick={() => setShowLogout(false)} className='rounded-lg bg-slate-300 hover:bg-slate-400 active:bg-slate-200 px-6 py-2'>
                                Cancel
                            </button>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    )
}
