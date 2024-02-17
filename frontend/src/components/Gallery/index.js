import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessibilitySettings } from '../../context/accessibility';
import ImageCard from '../ImageCard'
// import { useNavigation } from '../../context/navigation';
import { useNavigation } from '../../context/navigation';

const importAll = (context) => context.keys().map(context);

const imagesContext = require.context('../Home/gallery_images', false, /\.(png|jpg|jpeg|gif|svg)$/);
const imagesArr = importAll(imagesContext);
const images = imagesArr.reverse();

export default function Gallery() {
    const { accessibilitySettings, headerFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('gallery')
    }, []);

    const navigate = useNavigate();

    const subHeaderClass = `text-left underline underline-offset-8 tracking-widest text-2xl my-8 ${darkMode && "text-white"}`

    const galleryMap = images.map(image => {
        return (
            <div>
                <ImageCard image={image} />
            </div>
        )
    })

    return (
        <div className='flex flex-col my-4 gap-8 w-full px-4'>
            <h1 className="text-3xl pb-3 mb-4 border-b border-gray-300">Gallery</h1>
            <div data-testid='home-1' className='container mb-20 flex flex-wrap justify-center md:grid md:grid-cols-5 lg:grid-cols-6 gap-2'>
                {images.map((image) => (
                    <div className='rounded overflow-hidden'>
                        <img src={image} className='cursor-pointer object-cover min-h-full rounded transition-transform transform-gpu hover:scale-110'
                            onClick={() => {}}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
