import React, { useState, useEffect } from 'react'
// import SingleEvent from './SingleEvent'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../context/form'
import EventFormModal from '../EventFormModal'
import RemoveEventModal from '../RemoveEventModal'
import SingleNewsItem from './SingleNewsItem'
import { getAllEvents } from '../../store/events'
import { getAllNews } from '../../store/news'
// import fetchAll from '../../store/allData'
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation'
import { thunkGetAllData } from '../../store/allData'
import NewsFormModal from '../NewsFormModal'
import RemoveNewsModal from '../RemoveNewsModal'


export default function News() {
    const dispatch = useDispatch()
    const { accessibilitySettings, headerFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('news')
    }, [])

    const user = useSelector(state => state.session.user);

    const news = useSelector(state => state.news)
    const {
        showNewsForm,
        setShowNewsForm,
        showNewsRemove,
        setShowNewsRemove,
    } = useForm()

    const importAll = (context) => context.keys().map(context);
    const imagesContext = require.context('../Home/gallery_images', false, /\.(png|jpg|jpeg|gif|svg)$/);
    const images = importAll(imagesContext);

    const subHeaderClass = `text-left underline underline-offset-8 tracking-widest text-2xl my-8 ${darkMode && "text-white"}`
    const newsArray = Object.values(news)
    // if (!newsArray.length) {
    //     dispatch(thunkGetAllData())
    //     return null
    // }

    const sorted = newsArray.sort((a, b) => {
        const dateA = new Date(a.datePosted);
        const dateB = new Date(b.datePosted);

        // Compare the dates
        return dateB - dateA;
    });

    const newsMap = newsArray.map(newsItem => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        const image = images[getRandomInt(45)]

        return (
            <>
                <SingleNewsItem newsId={newsItem.id} image={image}/>
            </>
        )
    })

    return (
        <div className="px-4 md:w-4/5 mx-auto">
            <div className='flex flex-col w-full my-4'>
                <div className="pb-3 mb-6 border-b border-gray-300 flex justify-between gap-8">
                    <h2 className={`text-3xl`} >Park News</h2>
                    {user && <button
                                onClick={() => setShowNewsForm(true)}
                                className="self-center py-2 px-4 md:px-4 bg-cyan-500 text-white rounded-lg border border-cyan-500 hover:bg-cyan-600 hover:border-cyan-600 active:bg-cyan-300 active:border active:border-white">
                                Add News
                            </button>}
                </div>
                <div className='flex flex-col items-center md:items-stretch md:w-full'>
                    {sorted.map((article) => (
                        <SingleNewsItem newsId={article.id} />
                    ))}
                </div>
            </div>
            {/* <div>
                <EventCalendar/>
            </div> */}
            {showNewsForm && <NewsFormModal />}
            {showNewsRemove && <RemoveNewsModal />}
        </div>
    )
}
