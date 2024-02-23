import React, { useState, useEffect } from 'react'
import SingleEvent from './SingleEvent'
import eventList from './temp_events'
import EventCalendar from './EventCalendar'
import { useSelector } from 'react-redux'
import { useEventForm } from '../../context/eventForm'
import EventFormModal from '../EventFormModal'
import RemoveEventModal from '../RemoveEventModal'
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation'
import MyCalendar from '../Calendar/fullcalendar'
import FullCalendar from '../Calendar/fullcalendar'
import ReactCalendar from '../Calendar/reactbigcalendar'


export default function Events() {
    const { accessibilitySettings, headerFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('events')
    }, [])

    const user = useSelector(state => state.session.user);

    const events = useSelector(state => state.events.all)
    const {
        showEventForm,
        setShowEventForm,
        showRemoveEvent,
        setShowRemoveEvent,
        isUpdateEventForm,
        setIsUpdateEventForm
    } = useEventForm()

    const importAll = (context) => context.keys().map(context);
    const imagesContext = require.context('../Home/gallery_images', false, /\.(png|jpg|jpeg|gif|svg)$/);
    const images = importAll(imagesContext);

    const subHeaderClass = `text-left underline underline-offset-8 tracking-widest text-2xl my-8 ${darkMode && "text-white"}`
    const eventsArray = Object.values(events)
    if (!eventsArray.length) {
        return null
    }
    const eventsMap = eventsArray.map(event => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const image = images[getRandomInt(45)]

        return (
            <>
                <SingleEvent eventId={event.id} image={image}/>
            </>
        )
    })

    return (
        <div className="mt-6 px-4 mb-20">
            <div className='flex flex-col w-full my-4'>
                <div className="flex justify-between pb-3 mb-6 border-b border-gray-300">
                    <h2 className="text-3xl" >Upcoming Events</h2>
                    {user && <button
                                onClick={() => setShowEventForm(true)}
                                className="self-center py-2 px-4 md:px-4 bg-cyan-500 text-white rounded-lg border border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600 active:bg-cyan-300 active:border active:border-white">
                                Add Event
                            </button>}
                </div>
                <div className='grid grid-cols-3 gap-10'>
                    <div>
                        {/* <FullCalendar /> */}
                        <ReactCalendar events={eventsArray} />
                    </div>
                    <div className='flex flex-col col-span-2 items-center md:items-stretch md:w-full'>
                        {eventsMap}
                    </div>
                </div>
            </div>
            {/* <div>
                <EventCalendar/>
            </div> */}
            {showEventForm && <EventFormModal/>}
            {showRemoveEvent && <RemoveEventModal/>}
        </div>
    )
}
