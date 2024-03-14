import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import parkPhoto from './images/temp_park.jpeg'
import GalleryPreview from './GalleryPreview'
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation';
import ImageCarousel from '../Carousel';
import { useDispatch, useSelector } from 'react-redux';
import SingleNewsItem from '../News/SingleNewsItem'
import { thunkGetSortedEvents } from '../../store/events';

const importAll = (context) => context.keys().map(context);

const imagesContext = require.context('./gallery_images', false, /\.(png|jpg|jpeg|gif|svg)$/);
const imagesArr = importAll(imagesContext);
const images = imagesArr.reverse();


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
    const events = useSelector(state => state.events.sorted);

    const formattedDatetime = (datetime, type) => {
        const date = new Date(datetime)

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
            return formattedDate
        } else {
            return formattedDate + ' at ' + formattedTime
        }
    }

    return (
        <div data-testid='home-1' className='mb-20 flex flex-col gap-14'>
            <div class="h-80">
                <ImageCarousel images={images} />
            </div>

            <div className='flex flex-row md:grid grid-cols-3 gap-16'>
                <div className='col-span-2 flex flex-col gap-8 max-h-100'>
                    <div>
                        <h2 className='text-2xl font-bold text-cyan-800 tracking-wide pl-1 pb-1 mb-2 border-b border-cyan-800'>
                            HEADLINES
                        </h2>
                        <div className='pr-6 overflow-x-scroll py-6'>
                            <div className='flex flex-row gap-4'>
                                {newsArray.map(article => (
                                    <div key={article.id} className='rounded-lg border-2 border-gray-300 md:border hover:shadow-lg p-4 flex flex-col gap-2 min-w-64 justify-between'>
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-xl font-bold'>{article.title}</p>
                                            <p>{article.body}</p>
                                        </div>
                                        <p className='text-sm text-slate-600'>{formattedDatetime(article.datePosted, 'news')}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                    <h2 className='text-2xl font-bold text-green-700 tracking-wide pl-1 pb-1 mb-2 border-b border-green-700'>QUICK LINKS</h2>
                        <div className='grid grid-cols-3 gap-4 pt-6'>
                            <button className='hover:shadow-md hover:shadow-yellow-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate()}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-yellow-600'><i class="fa-solid fa-landmark"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>About</h3>
                                </div>
                            </button>
                            <button className='hover:shadow-md hover:shadow-green-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate()}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-green-600'> <i class="fa-solid fa-hand-holding-dollar"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Donate</h3>
                                </div>
                            </button>
                            <button className='hover:shadow-md hover:shadow-amber-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate()}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-amber-600'><i class="fa-solid fa-address-book"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Contact Info</h3>
                                </div>
                            </button>
                            <button className='hover:shadow-md hover:shadow-blue-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate()}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-blue-500'><i class="fa-brands fa-facebook"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Facebook</h3>
                                </div>
                            </button>
                            <button className='hover:shadow-md hover:shadow-rose-200 border border-gray-300 rounded-lg py-4' onClick={() => navigate()}>
                                <div className='flex justify-center gap-4 items-center'>
                                    <h3 className='text-3xl text-rose-400'><i class="fa-brands fa-instagram"></i></h3>
                                    <h3 className='text-lg tracking-wide font-bold'>Instagram</h3>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className='flex-grow'>
                    <h3 className='text-2xl font-bold text-rose-600 tracking-wide pl-1 pb-1 mb-2 border-b border-rose-600'>UPCOMING EVENTS</h3>
                    <div className='py-6'>
                        <div className='max-h-[560px] overflow-y-scroll overflow-hidden'>
                            <div className='flex flex-col gap-4 pr-6'>
                                {events.length ? events.map(event => (
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


            {/* <div className='flex flex-col items-center'>
                <span className={subheaderFormat} onClick={() => navigate("/gallery")}>View our gallery</span>
                <div className='hidden md:flex justify-around gap-4 mt-4 mb-8 px-2'>
                    <GalleryPreview />
                </div>
                <div className='md:hidden z-0 w-full mt-4 mb-8 px-2'>
                    <ImageCarousel images={images} />
                </div>
            </div> */}
        </div>
    )
}
