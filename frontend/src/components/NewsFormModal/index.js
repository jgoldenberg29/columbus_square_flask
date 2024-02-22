import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useForm } from '../../context/form.js';
import {useDispatch} from 'react-redux'
import { updateNews, addNews } from '../../store/news.js';
import { useAccessibilitySettings } from '../../context/accessibility';

export default function NewsFormModal() {
    const dispatch = useDispatch()

    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const {
        setShowForm,
        isUpdateForm,
        setIsUpdateForm,
        setItemToUpdate,
        showForm,
        itemToUpdate,
    } = useForm()

    useEffect(() => {
        if (isUpdateForm) {
            setTitle(itemToUpdate?.title)
            setDate(itemToUpdate?.formDate)
            setLocation(itemToUpdate.location)
            setBody(itemToUpdate.body)
            setTime(itemToUpdate.formTime)
        }
    }, [itemToUpdate, isUpdateForm])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const news = new FormData()

        if (isUpdateForm) news['id'] = itemToUpdate.id

        news.append('title', title)
        news.append('body', body)

        let data
        if (isUpdateForm) {
            data = await dispatch(updateNews(news))
        } else {
            console.log('news', news.entries())
            data = await dispatch(addNews(news))
            console.log("🚀 ~ handleSubmit ~ data:", data)

        }

        if (data.errors) {

        } else {
            setIsUpdateForm(false)
            setItemToUpdate('')
            setShowForm(false)
        }

    }

    const onClose = () => {
        setIsUpdateForm(false)
        setShowForm(false)
        setTitle('')
        setDate('')
        setTime('')
        setLocation('')
        setBody('')
    }

    return (
        <Transition appear show={showForm} as={Fragment}>
            <Dialog as="div" className="fixed z-100" onClose={onClose}>
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

            <div className={`fixed inset-0 overflow-y-auto flex items-center justify-center`}>
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
                            Add Event
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className={`${textSize ? null : "text-sm"} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Please enter your news details below.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="mt-4">
                            <input
                                type="title"
                                id="title"
                                name="title"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                id="body"
                                name="body"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                placeholder='Description'
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <div className='flex justify-center'>
                                <button type='submit' className='mt-4 py-3 px-8 bg-secondary rounded-xl active:bg-gray-300'>
                                    {isUpdateForm ? "Update" : "Create"}
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
            </Dialog>
        </Transition>
    )
}
