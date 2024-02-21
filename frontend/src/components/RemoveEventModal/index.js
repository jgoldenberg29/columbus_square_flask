import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import {useDispatch} from 'react-redux'
import { useForm } from '../../context/form';
import { removeEvent } from '../../store/events';
import { useAccessibilitySettings } from '../../context/accessibility';

export default function RemoveEventModal() {
    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const dispatch = useDispatch()

    const {
        showRemove,
        setShowRemove,
        removeItemId,
    } = useForm()

    const handleRemove = async () => {
        // remove event
         const data = await dispatch(removeEvent(removeItemId))
         if(data.errors) {

         } else {
            setShowRemove(false)
         }
    }

    return (
        <Transition appear show={showRemove} as={Fragment}>
            <Dialog as="div" className="fixed z-100" onClose={() => setShowRemove(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className={`fixed inset-0 bg-black/25 ${darkMode && "bg-white/25"}`} />
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
                    <Dialog.Panel className={`${darkMode ? "bg-gray-700" : "bg-white"} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all`}>
                        <Dialog.Title
                            as="h1"
                            className={`leading-6 text-gray-900 ${darkMode && "text-white"} ${textSize ? "text-2xl" : "text-xl"}`}
                        >
                            Remove Event
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className={`${textSize ? null : "text-sm"} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Are you sure you want to remove this event?
                            </p>
                        </div>
                        <div className='mt-6 flex flex-col gap-4'>
                            <button onClick={handleRemove} className='rounded-lg bg-primary hover:bg-secondary active:bg-slate-200 px-6 py-2'>
                                Remove Event
                            </button>
                            <button onClick={() => setShowRemove(false)} className='rounded-lg bg-slate-300 hover:bg-slate-400 active:bg-slate-200 px-6 py-2'>
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
