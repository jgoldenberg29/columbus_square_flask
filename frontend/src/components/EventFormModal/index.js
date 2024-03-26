import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition, Switch, Tab } from '@headlessui/react';
import { useForm } from '../../context/form.js';
import { useDispatch } from 'react-redux'
import { thunkUpdateEvent, thunkCreateEvent } from '../../store/events';
import { useAccessibilitySettings } from '../../context/accessibility';
import moment from 'moment';

const frequencyOptions = ["DNR", "consecutive", "weekly", "biweekly", "monthly"]

export default function EventFormModal() {
    const dispatch = useDispatch()

    const { accessibilitySettings } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [frequency, setFrequency] = useState("DNR");
    const [timeString, setTimeString] = useState("");
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);


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

        const formattedStartDate = formatDate(date);
        const formattedEndDate = formatDate(date);
        const formattedStartTime = formatTime(startTime);
        const formattedEndTime = formatTime(endTime);

        const startString = formattedStartDate + 'T' + formattedStartTime;
        const endString = formattedEndDate + 'T' + formattedEndTime;

        setStart(startString);
        setEnd(endString);
        console.log(startString)
    }, [frequency, date, startTime, endTime])

    useEffect(() => {
        if (title && date && startTime && endTime && description) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [title, date, startTime, endTime, location, description])

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
            setDescription(itemToUpdate.description)
            // setTime(itemToUpdate.formTime)
        }
    }, [itemToUpdate, isUpdateForm])

    const onClose = () => {
        setIsUpdateForm(false)
        setShowForm(false)
        setTitle('')
        setDate('')
        // setTime('')
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

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setImage(URL.createObjectURL(selectedFile));
            setImageFile(selectedFile);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setImageFile(null);
        // Reset the file input value to clear the file name
        document.getElementById('image').value = '';
    };

    const timeOptions = generateTimeOptions();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const event = new FormData()

        if (isUpdateForm) event['id'] = itemToUpdate.id

        event.append('title', title)
        event.append('start', start)
        event.append('end', end)
        // event.append('location', location)
        event.append('description', description)

        if (imageFile) {
            event.append('image', imageFile)
        }
        let data
        if (isUpdateForm) {
            data = await dispatch(thunkUpdateEvent(event))
                .then((res) => {
                    if (!res.errors) {
                        setIsUpdateForm(false)
                        setItemToUpdate('')
                        setShowForm(false)
                    } else {

                    }
                })
        } else {
            // data = await dispatch(thunkCreateEvent(event))
            //     .then((res) => {
            //         if (!res.errors) {
            //             setIsUpdateForm(false)
            //             setItemToUpdate('')
            //             setShowForm(false)
            //         } else {

            //         }
            //     })
            dispatch(thunkCreateEvent(event))
        }

        setIsUpdateForm(false)
        setItemToUpdate('')
        setShowForm(false)

    };

    return (
        <Transition appear show={showForm} as={Fragment}>
            <Dialog as="div" className="fixed z-[100]" onClose={onClose}>
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
                        <Dialog.Panel className={`${darkMode ? "bg-gray-700" : "bg-white"} w-full max-w-md transform overflow-scroll rounded-2xl p-6 text-left align-middle shadow-xl transition-all z-50`}>
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
                                className="mt-4 max-h-[500px] overflow-y-auto">
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
                                    <div className={`flex flex-col gap-1 my-2`}>
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
                                {/* <div className='flex flex-col my-2 gap-1'>
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
                                </div> */}
                                <div className='flex flex-col gap-1 my-2'>
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
                                <div className='flex flex-col gap-1 my-2'>
                                    <label className='text-xs ml-1 font-bold'>Image (optional)</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        className="mb-2 border border-gray-300 rounded-md"
                                        onChange={handleImageChange}
                                    />
                                    {image && (
                                        <div className="relative">
                                            <img src={image} alt='Preview Image' className='w-full'/>
                                            <div className="absolute top-0 right-0 m-2">
                                                <button
                                                    className="text-white bg-gray-300 hover:bg-red-400 rounded-full text-sm px-2 py-1"
                                                    onClick={handleDeleteImage}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex justify-center'>
                                    <button
                                        type='submit'
                                        disabled={disabled}
                                        className={`mt-4 py-3 px-7 text-white bg-cyan-500 rounded-lg active:bg-cyan-600 ${disabled ? 'cursor-not-allowed bg-slate-400' : ''}`}
                                    >
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
