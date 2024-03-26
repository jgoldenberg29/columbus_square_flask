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
import { useCalendar } from '../../context/calendar'

export default function Events() {
    const dispatch = useDispatch()
    const { setPage } = useNavigation();
    const { selectedEvent, setSelectedEvent } = useCalendar();

    const [listView, setListView] = useState('upcoming');

    useEffect(() => {
        dispatch(thunkGetSortedEvents())
        setPage('events')
    }, []);

    useEffect(() => {
        if (selectedEvent) {
            setListView('select');
        };
    }, [selectedEvent]);

    useEffect(() => {
        if (listView !== 'select') {
            setSelectedEvent(null);
        }
    }, [listView])

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

    const eventsArray = Object.values(events)

    const today = new Date();

    const pastEvents = eventsArray.filter((event) => {
        const startDate = new Date(event.start);
        if (startDate < today) return event;
    })

    if (!eventsArray.length) {
        dispatch(thunkGetAllData())
        return null
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    return (
        <div className="px-4 md:w-4/5 mx-auto mb-20 ">
            <div className='flex flex-col w-full my-4'>
                <div className="flex justify-between pb-3 mb-6 border-b border-gray-300">
                    <h2 className="text-3xl" >Events</h2>
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
                    <div className='flex gap-2 items-end'>
                        <h2 className='px-10 py-1 font-bold text-xl tracking-wide border-r'>
                            Filter
                        </h2>
                        <div className='flex gap-2 pl-2'>
                            <button onClick={() => setListView('upcoming')} className={`px-3 py-1 rounded-full border hover:border-gray-400 hover:bg-gray-100 ${listView === 'upcoming' && 'border-2 text-green-800 border-green-700 bg-green-200 hover:bg-green-100 hover:border-green-600'}`}>
                                Upcoming Events
                            </button>
                            <button onClick={() => setListView('past')} className={`px-3 py-1 rounded-full border border-gray-300 hover:border-gray-400 hover:bg-gray-100 ${listView === 'past' && 'border-2 text-yellow-800 border-yellow-700 bg-yellow-200 hover:bg-yellow-100 hover:border-yellow-600'}`}>
                                Past Events
                            </button>
                            {selectedEvent && <button onClick={() => null} className={`px-3 py-1 rounded-full border border-2 ${listView === 'select' && 'text-blue-800 border-blue-700 bg-blue-200 hover:bg-blue-100'}`}>
                                {selectedEvent.title}
                            </button>}
                        </div>
                    </div>
                    <div className='flex flex-col items-center md:items-stretch md:w-full'>
                        {listView === 'upcoming' && sortedEvents.map( event => (
                            <SingleEvent event={event} image={images[getRandomInt(45)]}/>
                        ))}
                        {listView === 'past' && pastEvents.map((event) => (
                            <SingleEvent event={event} image={images[getRandomInt(45)]}/>
                        ))}
                        {listView === 'select' && (
                            <SingleEvent event={selectedEvent} image={images[getRandomInt(45)]} />
                        )}
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
