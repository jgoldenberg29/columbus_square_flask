import React, { useState, useEffect } from 'react'
// import SingleEvent from './SingleEvent'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../context/form'
import EventFormModal from '../EventFormModal'
import RemoveEventModal from '../RemoveEventModal'
import SingleNewsItem from './SingleNewsItem'
import { getAllEvents } from '../../store/events'
import { getAllNews } from '../../store/news'
import fetchAll from '../../store/allData'
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation'


export default function News() {
    const dispatch = useDispatch()
    const { accessibilitySettings, headerFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('news')
    }, [])

    const user = useSelector(state => state.session.user);

    const news = useSelector(state => state.news.all)
    console.log("NEWS!!!!!!", news)
    const {
        showForm,
        setShowForm,
        showRemove,
    } = useForm()

    const importAll = (context) => context.keys().map(context);
    const imagesContext = require.context('../Home/gallery_images', false, /\.(png|jpg|jpeg|gif|svg)$/);
    const images = importAll(imagesContext);

    const subHeaderClass = `text-left underline underline-offset-8 tracking-widest text-2xl my-8 ${darkMode && "text-white"}`
    const newsArray = Object.values(news)
    if (!newsArray.length) {
        fetchAll(dispatch, getAllEvents, getAllNews)
        return null
    }
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
        <div className="mt-6 px-4 mb-20">
            <div className='flex flex-col w-full my-4'>
                <div className="flex justify-between gap-8">
                    <h2 className={`${headerFormat} underline ${textSpacing ? "underline-offset-4" : "underlin-offset-1"} pb-4`} >Park News</h2>
                    {user && <button
                                onClick={() => setShowForm(true)}
                                className="self-center py-1 px-2 md:px-4 bg-fun text-white rounded-xl border border-fun active:bg-secondary active:border active:border-white">
                                Add News
                            </button>}
                </div>
                <div className='flex flex-col items-center md:items-stretch md:w-full'>
                    {newsMap}
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
