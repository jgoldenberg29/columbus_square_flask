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
                <ImageCarousel images={images.slice(0, 5)} />
            </div>

            <div className='flex flex-row md:grid grid-cols-3 gap-16'>
                <div className='col-span-2 flex flex-col gap-8'>
                    <div>
                        <h2 className='text-2xl font-bold text-cyan-800 tracking-wide pb-1 mb-2 border-b border-cyan-800'>HEADLINES</h2>
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
                    <h2 className='text-2xl font-bold text-green-700 tracking-wide pb-1 mb-2 border-b border-green-700'>QUICK LINKS</h2>
                        <div></div>
                    </div>
                </div>
                <div>
                    <h3 className='text-2xl font-bold text-rose-600 tracking-wide pb-1 mb-2 border-b border-rose-600'>UPCOMING EVENTS</h3>
                    <div className='overflow-x-scroll py-6'>
                            <div className='flex flex-col gap-4'>
                                {events.map(event => (
                                    <div key={event.id} className='rounded-lg border-2 border-gray-300 md:border hover:shadow-lg p-4 flex flex-col gap-2 max-h-32 w-full justify-between'>
                                        <div className='flex flex-col gap-4'>
                                            <p className='text-xl font-bold'>{event.title}</p>
                                            <p>{event.description}</p>
                                        </div>
                                        <p className='text-sm text-slate-600'>{formattedDatetime(event.start, 'event')}</p>
                                    </div>
                                ))}
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
