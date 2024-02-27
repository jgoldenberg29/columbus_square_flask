import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useEventForm } from '../../context/eventForm';
import { useDispatch } from 'react-redux'
import { updateEvent, addEvent } from '../../store/events';
import { useAccessibilitySettings } from '../../context/accessibility';
import { convertToESTFormat } from '../Events/date_time_helpers.js'
import moment from 'moment';

const frequencyOptions = ["DNR", "consecutive", "weekly", "biweekly", "monthly"]

export default function EventFormModal() {
    const dispatch = useDispatch()

    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [time, setTime] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [frequency, setFrequency] = useState("DNR");
    const [timeString, setTimeString] = useState("");

    useEffect(() => {
        // console.log(startTime, ' and ', endTime)

        const alpha = startTime.split(' ')
        const beta = endTime.split(' ')

        const startHour = alpha[0].split(':')[0]
        const endHour = beta[0].split(':')[0]
        const startMin = alpha[0].split(':')[1]
        const endMin = beta[0].split(':')[1]

        const startAMPM = alpha[1]
        const endAMPM = beta[1]

        let numStartHour = parseInt(startHour)
        let numEndHour = parseInt(endHour)

        if (startAMPM === 'PM' && numStartHour !== 12) {
            numStartHour += 12
        }

        if (endAMPM === 'PM' && numEndHour !== 12) {
            numEndHour += 12
        }

        if (numStartHour > numEndHour) {
            const newEndHour = numStartHour + 1
            const newEndTime = newEndHour.toString() + ":" + startMin + " " + startAMPM
            setEndTime(newEndTime)
        }
    }, [startTime, endTime])

    useEffect(() => {
        // Function to format time string as "HH:mm A"
        const formatTime = (time) => {
            return moment(time, 'hh:mm A').format('HH:mm:ss');
        };

        // Function to format date as "YYYY-MM-DD"
        const formatDate = (date) => {
            return moment(date).format('YYYY-MM-DD');
        };

        let newTimeString = '';

        if (frequency === 'consecutive') {
            // Handle consecutive events
            const formattedStartTime = formatTime(startTime);
            const formattedEndTime = formatTime(endTime);
            const consecutiveDays = [];
            let currentDate = moment(startDate);
            while (currentDate <= moment(endDate)) {
                consecutiveDays.push(formatDate(currentDate) + 'T' + formattedStartTime + '+' + formatDate(currentDate) + 'T' + formattedEndTime);
                currentDate = currentDate.add(1, 'day');
            }
            newTimeString = consecutiveDays.join('&');
        } else {
            // Handle other frequencies
            const formattedStartDate = formatDate(date);
            const formattedEndDate = formatDate(date);
            const formattedStartTime = formatTime(startTime);
            const formattedEndTime = formatTime(endTime);
            newTimeString = formattedStartDate + 'T' + formattedStartTime + '/' + formattedEndDate + 'T' + formattedEndTime;
        }

        console.log("****TIMESTRING: ", newTimeString)
        // Update the timeString state
        setTimeString(newTimeString)
    }, [frequency, date, startDate, endDate, startTime, endTime])

    useEffect(() => {
        if (title && ((frequency === 'consecutive' && startDate && endDate) || (frequency !== 'consecutive' && date)) && startTime && endTime && location && description) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [title, date, startDate, endDate, time, startTime, endTime, location, description])

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

    const onClose = () => {
        setIsUpdateEventForm(false)
        setShowEventForm(false)
        setTitle('')
        setDate('')
        setTime('')
        setLocation('')
        setDescription('')
    }

    const generateTimeOptions = () => {
        const options = [];
        for (let hour = 8; hour <= 20; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour > 12 ? hour - 12 : hour;
                const paddedHour = displayHour.toString().padStart(2, '0');
                const paddedMinute = minute.toString().padStart(2, '0');
                const time = `${paddedHour}:${paddedMinute} ${ampm}`;
                options.push(time);
            }
        }
        return options;
    };

    const handleStartTime = (val) => {
        // e.preventDefault();

        const time = val

        setStartTime(time)

        const startTimeMoment = moment(time, 'hh:mm A');
        const endTimeMoment = moment(endTime, 'hh:mm A');

        if (startTimeMoment.isAfter(endTimeMoment) || !endTime) {
            setEndTime(time);
        }
    }

    const handleEndTime = (val) => {
        const time = val;

        setEndTime(time)

        const startTimeMoment = moment(startTime, 'hh:mm A');
        const endTimeMoment = moment(time, 'hh:mm A');

        if (endTimeMoment.isBefore(startTimeMoment)) {
            setStartTime(time)
        }
    }

    const timeOptions = generateTimeOptions();

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

    };

    const handleOneDay = () => {
        return;
    }

    const handleMultiDay = () => {
        return;
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
                        <Dialog.Panel className={`${darkMode ? "bg-gray-700" : "bg-white"} w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all z-50`}>
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
                                <div className="flex flex-col gap-1 my-2">
                                    <label className='text-xs ml-1 font-bold'>Title</label>
                                    <input
                                        type="title"
                                        id="title"
                                        name="title"
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                        placeholder='e.g. "Art in the Park"'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <div className={`${frequency === 'consecutive' && 'hidden'} flex flex-col gap-1 my-2`}>
                                        <label className='text-xs ml-1 font-bold'>Date</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            className="p-2 border border-gray-300 rounded-md w-full"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    <div className={`${frequency !== 'consecutive' && 'hidden'} grid grid-cols-2 gap-2 my-2`}>
                                        <div>
                                            <label className='text-xs ml-1 font-bold'>Start Date</label>
                                            <input
                                                type="date"
                                                id="date"
                                                name="date"
                                                className="p-2 border border-gray-300 rounded-md w-full"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className='text-xs ml-1 font-bold'>End Date</label>
                                            <input
                                                type="date"
                                                id="date"
                                                name="date"
                                                className="p-2 border border-gray-300 rounded-md w-full"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 my-2'>
                                        <div className='flex flex-col gap-1'>
                                            <label className='text-xs ml-1 font-bold'>Start Time</label>
                                            <select value={startTime} onChange={(e) => handleStartTime(e.target.value)} className="py-2 px-1 border border-gray-300 rounded-md w-full">
                                                {timeOptions.map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <label className='text-xs ml-1 font-bold'>End Time</label>
                                            <select value={endTime} onChange={(e) => handleEndTime(e.target.value)} className="py-2 px-1 border border-gray-300 rounded-md w-full">
                                                {timeOptions.map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className='text-xs ml-1 font-bold'>Reoccurence</label>
                                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className='py-2 px-1 mb-2 border border-gray-300 rounded-md w-full'>
                                        <option value="DNR">Does not repeat</option>
                                        <option value="consecutive">Consecutive days</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="biweekly">Every other week</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                {/* <div className='flex justify-end'>
                                    <button className='my-2 rounded-full py-1 px-3 text-cyan-500 text-sm border border-cyan-500'>
                                        <span><i class="fa-solid fa-plus"></i></span> Add Day
                                    </button>
                                </div> */}
                                <div className='flex flex-col my-2 gap-1'>
                                    <label className='text-xs ml-1 font-bold'>Location</label>
                                    <select
                                        id="location"
                                        name="location"
                                        className="mb-2 py-2 px-1 border border-gray-300 rounded-md w-full"
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
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <label className='text-xs ml-1 font-bold'>Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="mb-2 p-2 border border-gray-300 rounded-md w-full"
                                        placeholder='Briefly summarize your event...'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>
                                <div className='flex justify-center'>
                                    <button
                                        type='submit'
                                        disabled={disabled}
                                        className={`mt-4 py-3 px-7 text-white bg-cyan-500 rounded-lg active:bg-cyan-600 ${disabled ? 'cursor-not-allowed bg-slate-400' : ''}`}
                                    >
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
