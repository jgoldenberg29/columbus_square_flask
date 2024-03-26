import eventList from './temp_events'
import parkImage from '../Home/gallery_images/image_1.jpeg'
import { useForm } from '../../context/form.js'
import { useSelector } from 'react-redux'
import { useAccessibilitySettings } from '../../context/accessibility';
import { convertToESTFormat, formatDate } from './date_time_helpers.js'


export default function SingleEvent({event, image}) {
    const { accessibilitySettings, headerFormat, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const user = useSelector(state => state.session.user)
    // const event = useSelector(state => state.events[eventId])

    const {
        setShowForm,
        setIsUpdateForm,
        setShowRemove,
        setItemToUpdate,
        setRemoveItemId,
        itemToUpdate,
    } = useForm()

    const subHeaderClass = 'text-left underline underline-offset-8 xxs:text-md xs:text-lg sm:text-xl md:text-2xl lg:w-3xl xl:4xl my-4'

    const eventTextClass = `lg:w-md xl:md my-2 ${contentFormat}`

    // const formattedDate = formatDate(event.displayDate);
    // const formattedTime = convertToESTFormat(event.time);
    // const formattedTime = event.displayTime[0] === '0' ? event.displayTime.slice(1): event.displayTime;

    const startDate = new Date(event.start)

    const formattedDate = startDate.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });

    const formattedTime = startDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });


    const updateOnClick = () => {
        setShowForm(true)
        setIsUpdateForm(true)
        setItemToUpdate(event)
    }

    const removeOnClick = () => {
        setShowRemove(true)
        setRemoveItemId(event.id)
    }

    return (
        <div className='flex flex-col md:flex-row gap-2 md:gap-3 mb-6 w-fit md:w-full'>
            <div className={`container rounded-lg border border-gray-300 hover:shadow-md md:p-2 flex flex-col flex-grow align-center md:grid md:grid-cols-5 lg:gap-8 xl:gap-16 overflow-hidden`}>
                <div className='md:hidden flex flex-col w-full'>
                    <img className="w-full self-center max-w-96 xl:min-w-70 object-cover"
                        src={image}/>
                </div>
                <div className="w-11/12 p-4 md:p-2 md:ml-1 pt-4 md:mt-0 md:mr-4 col-span-3">
                    <p className="font-bold text-3xl">{event.title}</p>
                    <p className={`${eventTextClass} flex gap-3`}>
                        <div>{formattedDate} at {formattedTime}</div>
                        {/* <div className='pl-3 border-l border-black'>{event.location}</div> */}
                    </p>
                    <p className={`${eventTextClass} mt-6`}>{event.description}</p>
                </div>
                <div className='hidden md:flex rounded-md overflow-hidden md:col-span-2 max-h-56'>
                    <img className="self-center min-w-full h-auto object-cover object-center"
                        src={event.image ? `data:image/jpeg;base64, ${event.image}` : image}/>
                </div>
            </div>
            {user && <div className="flex flex-row md:flex-col justify-end md:justify-start gap-2 mt-1">
                <button
                    onClick={updateOnClick}
                    className={`h-10 w-10 text-green-500 rounded-lg border border-green-500 hover:border-green-300 hover:text-green-300 active:bg-green-600 active:border active:border-white`}
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    onClick={removeOnClick}
                    className={`h-10 w-10 text-red-500 rounded-lg border border-red-500 hover:text-red-300 hover:border-red-300`}
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>}
        </div>
    )
}
