import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useForm } from '../../context/form.jsx';
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { thunkGetAllNews, thunkCreateNews, thunkEditComment, thunkUpdateNews } from '../../store/news.js';
import { useAccessibilitySettings } from '../../context/accessibility.jsx';

export default function NewsFormModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [disabled, setDisabled] = useState(true);

    const {
        setShowNewsForm,
        newsUpdate,
        setNewsUpdate,
        showNewsForm,
        newsToUpdate,
        setNewsToUpdate,
    } = useForm()

    useEffect(() => {
        if (newsUpdate) {
            setTitle(newsToUpdate?.title)
            setBody(newsToUpdate.body)
        }
    }, [newsToUpdate, newsUpdate])

    useEffect(() => {
        if (title && body) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [title, body])

    const handleSubmit = () => {
        const article = new FormData();

        article.append('title', title)
        article.append('body', body)

        if (!newsUpdate) {
            dispatch(thunkCreateNews(article));
        } else {
            dispatch(thunkUpdateNews(article, newsToUpdate.id))
        }
        // navigate('/');
        setShowNewsForm(false);
        return;
    }

    const onClose = () => {
        setNewsUpdate(false)
        setShowNewsForm(false);
        setTitle('');
        setBody('');
    }

    return (
        <Transition appear show={showNewsForm} as={Fragment}>
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
                            Add Announcement
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className={`${textSize ? null : "text-sm"} ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                Please enter your announcement details below.
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
                                <button type='submit' disabled={disabled} className='mt-4 py-3 px-8 text-white disabled:cursor-not-allowed bg-cyan-500 hover:bg-cyan-400 rounded-xl active:bg-cyan-300'>
                                    {newsUpdate ? "Update" : "Create"}
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
