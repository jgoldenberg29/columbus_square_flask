import React, { useState, useEffect } from 'react'
import SingleEvent from './SingleEvent'
import eventList from './temp_events'
import EventCalendar from './EventCalendar'
import { thunkGetAllEvents, thunkGetSortedEvents } from '../../store/events'
import { getAllNews } from '../../store/news'
// import fetchAll from '../../store/allData'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../context/form'
import EventFormModal from '../EventFormModal'
import RemoveEventModal from '../RemoveEventModal'
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation'
import ReactCalendar from '../Calendar/reactbigcalendar'
import { thunkGetAllData } from '../../store/allData'


export default function Events() {
    const dispatch = useDispatch()
    const { accessibilitySettings, headerFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        dispatch(thunkGetSortedEvents())
        setPage('events')
    }, [])

    const user = useSelector(state => state.session.user);

    const events = useSelector(state => state.events.all)
    const sortedEvents = useSelector(state => state.events.sorted)

    const {
        showForm,
        setShowForm,
        showRemove,
    } = useForm()

    const importAll = (context) => context.keys().map(context);
    const imagesContext = require.context('../Home/gallery_images', false, /\.(png|jpg|jpeg|gif|svg)$/);
    const images = importAll(imagesContext);

    const subHeaderClass = `text-left underline underline-offset-8 tracking-widest text-2xl my-8 ${darkMode && "text-white"}`
    const eventsArray = Object.values(events)

    if (!eventsArray.length) {
        dispatch(thunkGetAllData())
        return null
    }
    // const eventsMap = eventsArray.map(event => {
    //     function getRandomInt(max) {
    //         return Math.floor(Math.random() * max);
    //     }
    //     const image = images[getRandomInt(45)]

    //     return (
    //         <>
    //             <SingleEvent eventId={event.id} image={image}/>
    //         </>
    //     )
    // })

    // const eventsMap = sortedEvents.map(event => {
    //     function getRandomInt(max) {
    //         return Math.floor(Math.random() * max);
    //     }
    //     const image = images[getRandomInt(45)]

    //     return (
    //         <>
    //             <SingleEvent eventId={event.id} image={image}/>
    //         </>
    //     )
    // })

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    // console.log('********: ', sortedEvents)

    return (
        <div className="px-4 md:w-4/5 mx-auto mb-20 ">
            <div className='flex flex-col w-full my-4'>
                <div className="flex justify-between pb-3 mb-6 border-b border-gray-300">
                    <h2 className="text-3xl" >Upcoming Events</h2>
                    {user && <button
                                onClick={() => setShowForm(true)}
                                className="self-center py-2 px-4 md:px-4 bg-cyan-500 text-white rounded-lg border border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600 active:bg-cyan-300 active:border active:border-white">
                                Add Event
                            </button>}
                </div>
                <div className='flex flex-col gap-10'>
                    <div className='hidden md:block'>
                        <ReactCalendar events={eventsArray} />
                    </div>
                    <div className='flex flex-col items-center md:items-stretch md:w-full'>
                        {/* {eventsMap.length ? eventsMap : null} */}
                        {sortedEvents.map( event => {
                            return (
                                <SingleEvent event={event} image={images[getRandomInt(45)]}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            {/* <div>
                <EventCalendar/>
            </div> */}
            {showForm && <EventFormModal/>}
            {showRemove && <RemoveEventModal/>}
        </div>
    )
}
