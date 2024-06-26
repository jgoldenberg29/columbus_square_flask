import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation';
import ImageCarousel from '../Carousel';
import { thunkGetAllImages } from '../../store/gallery';
import { useDispatch, useSelector } from 'react-redux';
import SingleNewsItem from '../News/SingleNewsItem'
import { thunkGetSortedEvents } from '../../store/events';
import moment from 'moment';
import image1 from './fb_images/csp-movie.jpeg'
import image2 from './fb_images/csp-night.jpeg'
import image3 from './fb_images/csp-walkway.jpeg'
import image4 from './fb_images/csp-walkway.jpeg'

const images = [image1, image2, image3, image4]

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { accessibilitySettings, headerFormat, subheaderFormat, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('home')
        dispatch(thunkGetSortedEvents());
    }, []);

    const newsState = useSelector(state => state.news);
    const newsArray = Object.values(newsState);
    const sortedEvents = useSelector(state => state.events.sorted);
    // const eventsArray = Object.values(events)

    const sortedNews = newsArray.sort((a, b) => {
        const dateA = new Date(a.datePosted);
        const dateB = new Date(b.datePosted);

        // Compare the dates
        return dateB - dateA;
    });

    // const today = new Date();

    // const sortedEvents = eventsArray
    //     .filter(event => {
    //         const startDate = new Date(event.start);
    //         return startDate > today; // Filter out events that haven't started yet
    //     })
    //     .sort((a, b) => {
    //         const startDateA = new Date(a.start);
    //         const startDateB = new Date(b.start);
    //         return startDateA - startDateB; // Sort events by start date
    //     });


    const formattedDatetime = (datetime, type) => {
        const date = new Date(datetime);
        const pastDate = moment(date);
        const relativeDate = pastDate.fromNow();

        const formattedDate = date.toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });

        const formattedTime = date.toLocaleString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        if (type === 'news') {
            return relativeDate
        } else {
            return formattedDate + ' at ' + formattedTime
        }
    }

    return (
        <div data-testid='home-1' className='min-h-screen flex flex-col gap-14'>
            <div className="h-80 min-w-screen">
                <ImageCarousel images={images} />
            </div>

            <div className='px-8 pb-10 xl:w-4/5 mx-auto flex flex-col md:grid grid-cols-3 gap-16 w-screen'>
                <div className='col-span-2 flex flex-col gap-8 max-h-100'>
                    <div className='w-full'>
                        <div className='px-1 pb-1 mb-2 border-b border-cyan-700 flex gap-4 justify-between items-center max-w-full'>
                            <h2 className='text-2xl font-bold text-cyan-700 tracking-wide'>
                                ANNOUNCEMENTS
                            </h2>
                            <a href='/news' className='text-sm pr-2 text-blue-500 underline hover:no-underline underline-offset-2 hover:text-blue-400'>
                                View All
                            </a>
                        </div>
                        <div className='pr-6 overflow-x-scroll py-6 max-w-full'>
                            {sortedNews ?
                                <div className='flex flex-row gap-4' style={{ maxWidth: '100vw' }}>
                                    {sortedNews.map(article => (
                                        <div key={article.id} className='rounded-lg border-2 border-gray-300 md:border hover:shadow-lg p-4 flex flex-col gap-2 min-w-64 justify-between'>
                                            <div className='flex flex-col gap-4'>
                                                <p className='text-xl font-bold'>{article.title}</p>
                                                <p>{article.body}</p>
                                            </div>
                                            <p className='text-sm text-slate-600'>{formattedDatetime(article.datePosted, 'news')}</p>
                                        </div>
                                    ))}
                                </div>
                                :
                                <h1>No announcements yet.</h1>
                            }
                        </div>
                    </div>
                    <div className='flex flex-col md:hidden'>
                        <h3 className='text-2xl font-bold text-rose-600 tracking-wide pl-1 pb-1 mb-2 border-b border-rose-600'>UPCOMING EVENTS</h3>
                        <div className='pr-6 overflow-x-scroll py-6 w-full'>
                            <div className='flex flex-row gap-4'>
                                {sortedEvents.length ? sortedEvents.map(event => (
                                    <div key={event.id} className='rounded-lg border-2 border-gray-300 md:border hover:shadow-lg p-4 flex flex-col gap-2 h-48 min-w-64 justify-between'>
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-xl font-bold'>{event.title}</p>
                                            <p>{event.description}</p>
                                        </div>
                                        <p className='text-sm text-slate-600'>{formattedDatetime(event.start, 'event')}</p>
                                    </div>
                                )) : (
                                    <h1 className='flex justify-center'>No upcoming events.</h1>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-2xl font-bold text-green-700 tracking-wide pl-1 pb-1 mb-2 border-b border-green-700'>QUICK LINKS</h2>
                        <div className='flex flex-col md:grid grid-cols-3 gap-4 pt-6'>
                            {/* <button className='hover:shadow-md hover:shadow-yellow-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate('/about')}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-yellow-600'><i className="fa-solid fa-landmark"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>About</h3>
                                </div>
                            </button> */}
                            {/* <button className='hover:shadow-md hover:shadow-green-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate('/donate')}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-green-600'> <i className="fa-solid fa-hand-holding-dollar"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Donate</h3>
                                </div>
                            </button> */}
                            <button className='hover:shadow-md hover:shadow-amber-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate('/contact')}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-amber-600'><i className="fa-solid fa-address-book"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Contact Info</h3>
                                </div>
                            </button>
                            <a href='https://www.facebook.com/friendsofcolumbussquare/' target='_blank' className='hover:shadow-md hover:shadow-blue-200 border border-gray-300 rounded-lg py-4'>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-blue-500'><i className="fa-brands fa-facebook"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Facebook</h3>
                                </div>
                            </a>
                            <a href='https://www.instagram.com/friendsofcolumbussq/' target='_blank' className='hover:shadow-md hover:shadow-blue-200 border border-gray-300 rounded-lg py-4'>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-rose-400'><i className="fa-brands fa-instagram"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Instagram</h3>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='hidden md:flex md: flex-col flex-grow'>
                    <h3 className='text-2xl font-bold text-rose-600 tracking-wide pl-1 pb-1 mb-2 border-b border-rose-600'>UPCOMING EVENTS</h3>
                    <div className='py-6'>
                        <div className='max-h-[560px] overflow-y-scroll overflow-hidden'>
                            <div className='flex flex-col gap-4 pr-6'>
                                {sortedEvents.length ? sortedEvents.map(event => (
                                    <div key={event.id} className='rounded-lg border-2 border-gray-300 md:border hover:shadow-lg p-4 flex flex-col gap-2 h-48 w-full justify-between'>
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-xl font-bold'>{event.title}</p>
                                            <p>{event.description}</p>
                                        </div>
                                        <p className='text-sm text-slate-600'>{formattedDatetime(event.start, 'event')}</p>
                                    </div>
                                )) : (
                                    <h1 className='flex justify-center'>No upcoming events.</h1>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
