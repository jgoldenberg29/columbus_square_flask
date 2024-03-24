import { useForm } from '../../context/form.js'
import { useSelector } from 'react-redux'
import { useAccessibilitySettings } from '../../context/accessibility';
import moment from 'moment';

export default function SingleNewsItem({newsId, image}) {
    const { accessibilitySettings, headerFormat, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize } = accessibilitySettings;

    const user = useSelector(state => state.session.user)
    const newsItem = useSelector(state => state.news[newsId])

    const {
        setShowForm,
        setIsUpdateForm,
        setShowRemove,
        setItemToUpdate,
        setRemoveItemId,
    } = useForm()

    const subHeaderClass = 'text-left underline underline-offset-8 xxs:text-md xs:text-lg sm:text-xl md:text-2xl lg:w-3xl xl:4xl my-4'

    const newsTextClass = `lg:w-md xl:md my-2 ${contentFormat}`

    const updateOnClick = () => {
        setShowForm(true)
        setIsUpdateForm(true)
        setItemToUpdate(newsItem)
    }

    const removeOnClick = () => {
        setShowRemove(true)
        setRemoveItemId(newsItem.id)
    }

    const date = new Date(newsItem.datePosted)
    const pastDate = moment(date);
    const relativeDate = pastDate.fromNow();

    return (
        <div className='flex flex-col md:flex-row gap-2 md:gap-3 mb-6 w-fit md:w-full'>
            <div className={`container rounded-lg border border-gray-300 hover:shadow-md md:p-2 flex flex-col flex-grow align-center md:grid md:grid-cols-5 lg:gap-8 xl:gap-16 overflow-hidden`}>
                <div className='md:hidden flex flex-col w-full'>
                    <img className="w-full self-center max-w-96 xl:min-w-70 object-cover"
                        src={image}/>
                </div>
                <div className="w-11/12 p-4 md:p-2 md:ml-1 pt-4 md:mt-0 md:mr-4 col-span-3 flex flex-col justify-between">
                    <div>
                        <p className={`font-bold text-2xl ${headerFormat}`}> {newsItem.title}</p>
                        <p className={newsTextClass}>{newsItem.body}</p>
                    </div>
                    <p className='text-sm text-gray-500'>{relativeDate}</p>
                </div>
                <div className='hidden md:flex rounded-md overflow-hidden md:col-span-2 max-h-56'>
                    <img className="self-center h-54 min-h-full rounded-sm object-cover object-center"
                        src={image}/>
                </div>
            </div>
            {user && <div className="flex flex-row md:flex-col justify-end md:justify-start gap-2 mt-1">
                <button
                    onClick={updateOnClick}
                    className={`h-10 w-10 text-yellow-500 rounded-lg border border-yellow-500 ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"} active:bg-secondary active:border active:border-white`}
                >
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    onClick={removeOnClick}
                    className={`h-10 w-10 text-red-500 rounded-lg border border-red-500 ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>}
        </div>
    )
}
