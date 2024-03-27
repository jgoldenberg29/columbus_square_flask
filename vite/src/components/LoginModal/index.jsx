import React, { useState, Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useLogin } from '../../context/login';
import { useAccessibilitySettings } from '../../context/accessibility';
import { login } from '../../store/session';
import {useDispatch} from 'react-redux'

export default function LoginModal() {
    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const dispatch = useDispatch()
    const { showLogin, setShowLogin } = useLogin()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState("");

    const user = useSelector(state => state.session.user)
    // const errors = useSelector(state => state.session.errors)

    const handleSubmit = (email, password) => {
        const credentials = {email, password}
        const data = dispatch(login(credentials))
            .then((res) => {
                if (res.errors) {
                    setErrors(res.errors)
                } else {
                    setErrors("")
                    return;
                }
            })
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    useEffect(() => {
        if (user) {
            const timeout = setTimeout(() => {
              setShowLogin(false);
            }, 1000);

            return () => clearTimeout(timeout);
          }
    }, [user])

    useEffect(() => {
        if (email && password) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password])

    return (
        <Transition appear show={showLogin} as={Fragment}>
            <Dialog as="div" className="fixed z-[100]" onClose={() => setShowLogin(false)}>
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
                            Admin Login
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className={`${textSize ? "text-base pt-2" : "text-sm"} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Please enter your email and password below.
                            </p>
                        </div>
                        <div className="mt-4">
                            {errors &&
                                <div className="flex gap-2 items-center bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md my-4">
                                    <i class="fa-solid fa-circle-exclamation"></i>
                                    <p className="text-sm font-semibold">Invalid credentials.</p>
                                </div>
                            }
                            {user &&
                                <div className="flex gap-2 items-center bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md my-4">
                                    <i class="fa-solid fa-circle-check"></i>
                                    <p className="text-sm font-semibold">Success!</p>
                                </div>
                            }
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                placeholder='Password'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='flex justify-center'>
                                <button onClick={() => handleSubmit(email, password)} disabled={disabled} className={`mt-6 py-3 px-8 bg-cyan-600 text-white rounded-xl active:bg-gray-300 hover:bg-cyan-500 disabled:cursor-not-allowed`}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    )
}
