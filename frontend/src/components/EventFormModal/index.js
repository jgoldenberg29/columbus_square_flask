import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useEventForm } from '../../context/eventForm';
import {useDispatch} from 'react-redux'
import { updateEvent, addEvent } from '../../store/events';
import { useAccessibilitySettings } from '../../context/accessibility';
import { convertToESTFormat } from '../Events/date_time_helpers.js'

export default function EventFormModal() {
    const dispatch = useDispatch()

    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

    const {
        showEventForm,
        setShowEventForm,
        isUpdateEventForm,
        setIsUpdateEventForm,
        eventToUpdate,
        setEventToUpdate,
    } = useEventForm()

    useEffect(() => {
        if (isUpdateEventForm) {
            setTitle(eventToUpdate?.title)
            setDate(eventToUpdate?.formDate)
            setLocation(eventToUpdate.location)
            setDescription(eventToUpdate.description)
            setTime(eventToUpdate.formTime)
        }
    }, [eventToUpdate, isUpdateEventForm])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const event = new FormData()

        if (isUpdateEventForm) event['id'] = eventToUpdate.id

        event.append('title', title)
        event.append('date', date)
        event.append('time', time)
        event.append('location', location)
        event.append('description', description)
        console.log('formdata title', event.get('title'))

        let data
        if (isUpdateEventForm) {
            data = await dispatch(updateEvent(event))
        } else {
            console.log('event', event.entries())
            data = await dispatch(addEvent(event))
            console.log("🚀 ~ handleSubmit ~ data:", data)

        }

        if (data.errors) {

        } else {
            setIsUpdateEventForm(false)
            setEventToUpdate('')
            setShowEventForm(false)
        }

    }

    const onClose = () => {
        setIsUpdateEventForm(false)
        setShowEventForm(false)
        setTitle('')
        setDate('')
        setTime('')
        setLocation('')
        setDescription('')
    }

    return (
        <Transition appear show={showEventForm} as={Fragment}>
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
                                Please enter your event details below.
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
                            <input
                                type="date"
                                id="date"
                                name="date"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <input
                                type="time"
                                id="time"
                                name="time"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                            <select
                                id="location"
                                name="location"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                placeholder='Location'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Choose one</option>
                                <option value="Whole Park">Whole Park</option>
                                <option value="Field">Field</option>
                                <option value="Playground">Playground</option>
                                <option value="Rec Center">Rec Center</option>
                                <option value="Picnic Area">Picnic Area</option>
                                <option value="Reed street">Reed street</option>
                                <option value="13th street">13th Street</option>
                            </select>
                            <textarea
                                id="description"
                                name="description"
                                className="my-2 p-2 border border-gray-300 rounded-md w-full"
                                placeholder='Description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <div className='flex justify-center'>
                                <button type='submit' className='mt-4 py-3 px-8 bg-secondary rounded-xl active:bg-gray-300'>
                                    {isUpdateEventForm ? "Update" : "Create"}
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
