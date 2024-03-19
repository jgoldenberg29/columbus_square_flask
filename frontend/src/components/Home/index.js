import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import parkPhoto from './images/temp_park.jpeg'
import GalleryPreview from './GalleryPreview'
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation';
import ImageCarousel from '../Carousel';
import { thunkGetAllImages } from '../../store/gallery';

const importAll = (context) => context.keys().map(context);

const imagesContext = require.context('./gallery_images', false, /\.(png|jpg|jpeg|gif|svg)$/);
const imagesArr = importAll(imagesContext);
const images = imagesArr.reverse();

export default function Home() {
    const { accessibilitySettings, headerFormat, subheaderFormat, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('home')
        thunkGetAllImages()
    }, []);

    const navigate = useNavigate();

    const subHeaderClass = `text-center ${darkMode ? "text-white" : null} ${textSize ? "text-2xl" : "text-xl"}`

    return (
        <div data-testid='home-1' className='mb-20 flex flex-col gap-14'>
            <div class="bg-cover bg-center min-h-96" style={{ backgroundImage: `url(${parkPhoto})` }} />
            <div className='flex flex-col md:flex-row items-center justify-evenly gap-10 md:gap-20'>
                <button onClick={() => navigate("/about")} className={`flex flex-col justify-center gap-3 items-center rounded-full h-56 w-56 p-6 active:bg-slate-200 ${darkMode ? "text-white bg-slate-500 hover:slate-400" : "bg-secondary/75 hover:bg-secondary"}`}>
                    <div className={`text-6xl md:text-7xl text-yellow-500 ${darkMode ? "" : ""}`}>
                        <i class="fa-solid fa-lightbulb"></i>
                    </div>
                    <div className={subheaderFormat} >Learn about the park</div>
                </button>
                <button onClick={() => navigate("/contact")} className={`flex flex-col justify-center gap-3 items-center rounded-full h-56 w-56 p-6 active:bg-slate-200 ${darkMode ? "text-white bg-slate-500 hover:slate-400" : "bg-secondary/75 hover:bg-secondary"}`}>
                    <div className={`text-6xl md:text-7xl text-yellow-800 ${darkMode ? "" : ""}`}>
                        <i class="fa-solid fa-handshake-angle"></i>
                    </div>
                    <div className={subheaderFormat} >How to help</div>
                </button>
                <button onClick={() => navigate("/events")} className={`flex flex-col justify-center gap-3 items-center rounded-full h-56 w-56 p-6 active:bg-slate-200 ${darkMode ? "text-white bg-slate-500 hover:slate-400" : "bg-secondary/75 hover:bg-secondary"}`}>
                    <div className={`text-6xl md:text-7xl text-sky-500 ${darkMode ? "" : ""}`}>
                        <i class="fa-solid fa-calendar-days"></i>
                    </div>
                    <div className={subheaderFormat} >Upcoming Events</div>
                </button>
            </div>
            <div className='flex flex-col items-center'>
                <span className={subheaderFormat} onClick={() => navigate("/gallery")}>View our gallery</span>
                <div className='hidden md:flex justify-around gap-4 mt-4 mb-8 px-2'>
                    <GalleryPreview />
                </div>
                <div className='md:hidden z-0 w-full mt-4 mb-8 px-2'>
                    <ImageCarousel images={images} />
                </div>
            </div>
        </div>
    )
}
