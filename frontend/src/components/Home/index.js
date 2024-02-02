import parkPhoto from './images/temp_park.jpeg'
import lightbuld from './images/lightbuld.jpeg'
import shovel from './images/shovel_icon.jpeg'
import calendar from './images/calendar_icon.jpeg'
import GalleryPreview from './GalleryPreview'

export default function Home() {

    const subHeaderClass = 'text-center tracking-widest text-xl md:text-2xl lg:w-3xl xl:4xl'
    const iconClass = "w-16 md:w-20 lg:w-24 xl:w-32"

    return (
        <div data-testid='home-1'>
            <div class="bg-cover bg-center min-h-96" style={{ backgroundImage: `url(${parkPhoto})` }}>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-around gap-10 md:gap-20 my-10'>
                <div className='flex flex-col items-center'>
                    <span className={subHeaderClass} >Learn about the park</span>
                    <img className={iconClass} src={lightbuld}/>
                </div>
                <div className='flex flex-col items-center'>
                    <span className={subHeaderClass} >How to help</span>
                    <img className={iconClass} src={shovel}/>
                </div>
                <div className='flex flex-col items-center'>
                    <span className={subHeaderClass} >Upcoming Events</span>
                    <img className={iconClass} src={calendar}/>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <span className={subHeaderClass}>View our gallery</span>
                <div className='flex justify-around gap-4 mt-4 mb-8 px-2'>
                    <GalleryPreview />
                </div>
            </div>

            {/* mobile */}
        </div>
    )
}
