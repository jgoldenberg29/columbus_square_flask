import React, { useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAccessibilitySettings } from '../../context/accessibility';
import { useNavigation } from '../../context/navigation';

export default function Contact() {
    const { accessibilitySettings, headerFormat, subheaderFormat, contentFormat } = useAccessibilitySettings();
    const { darkMode, textSize, textSpacing } = accessibilitySettings;
    const { setPage } = useNavigation();

    useEffect(() => {
        setPage('contact')
    }, [])

    return (
        <div className='mt-10 mb-36'>
            <h1 className='text-3xl pb-3 mb-6 border-b border-gray-300'>Contact Us</h1>
            <div className='flex flex-col lg:grid grid-cols-2 gap-10'>
                <div className='px-4'>
                    <div className='py-4'>
                        <h2 className='text-xl font-bold mb-3'>Friends of Columbus Square</h2>
                        <p className='ml-2 flex items-center gap-3'>
                            <i class="fa-solid fa-envelope"></i>
                            <a href='mailto:friends@columbussquare.org' target='_blank' className='hover:text-rose-600'>friends@columbussquare.org</a>
                        </p>
                    </div>
                    <div className='py-4'>
                        <h2 className='text-xl font-bold mb-3'>Columbus Square Recreation Center</h2>
                        <p className="mb-3">
                            During the Fall, Winter, and Spring most centers operate between 2:00 PM and 10:00 PM. Some centers have limited hours on Saturdays.
                        </p>
                        <p className='ml-2 flex items-center gap-3'>
                            <i class="fa-solid fa-phone"></i>
                            <a href='' target='_blank' className='hover:text-rose-600'>(215) 685-1890</a>
                        </p>
                        <div className='mt-3 ml-2'>
                            <ul>
                                <li className="font-bold">Columbus Square Park</li>
                                <li className="">Recreation Center</li>
                                <li className="">1200 Wharton St,</li>
                                <li className="">Philadelphia, PA 19147</li>
                            </ul>
                        </div>
                    </div>
                    <div className='py-4'>
                        <h2 className='text-xl font-bold mb-3'>Philadelphia Parks and Recreation</h2>
                        <p className="mb-3">
                            Friends of Columbus Square works with, but is not part of, the City of Philadelphia’s Parks and Recreation Department. The Columbus Square Recreation Center coordinates club, team, and individual use of the recreation facilities at Columbus Square Park.
                        </p>
                        <p className='ml-2 flex items-center gap-3 mb-3'>
                            <i class="fa-solid fa-phone"></i>
                            <a href='' target='_blank' className='hover:text-rose-600'>(215) 683-3600</a>
                        </p>
                        <p className='ml-2 flex items-center gap-3'>
                            <i class="fa-solid fa-envelope"></i>
                            <a href='mailto:parksandrecreation@phila.gov' target='_blank' className='hover:text-rose-600'>parksandrecreation@phila.gov</a>
                        </p>
                    </div>
                </div>
                <div className='px-4 py-4'>
                    <h2 className='text-xl font-bold mb-3'>Location</h2>
                    <p className="mb-3">
                        Bounded by 12th, 13th, Wharton, and Reed Streets, Philadelphia, PA, 19147
                    </p>
                    <div className='max-h-[220]'>
                        <MapContainer center={[39.9329856,-75.1650]} zoom={17} style={{ height: '500px', width: '100%', zIndex: '0', }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                        </MapContainer>
                    </div>
                </div>
            </div>
            {/* <div className='flex flex-col md:grid md:grid-cols-2 gap-10'>
                <div className={`hidden md:flex ${darkMode ? "z-0" : "-z-10"}`}>
                    <MapContainer center={[39.9329856,-75.1650]} zoom={17} style={{ height: '560px', width: '100%', zIndex: '0', }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </MapContainer>
                </div>
                <div className='flex flex-col justify-evenly px-10'>
                    <div className='py-5'>
                        <h1 className={`${subheaderFormat} underline ${textSpacing ? "underline-offset-4" : "underline-offset-1"} leading-6 pb-4`}>Recreation Center Hours</h1>
                        <p className={contentFormat}>During the Fall, Winter, and Spring most centers operate between 2:00 PM and 10:00 PM. Some centers have limited hours on Saturdays.</p>
                    </div>
                    <div className='py-5'>
                        <h1 className={`${subheaderFormat} underline ${textSpacing ? "underline-offset-4" : "underline-offset-1"} leading-6 pb-6`}>Contact Info</h1>
                        <div className='mb-6'>
                            <ul>
                                <li className={`${contentFormat} font-bold`}>Columbus Square Park</li>
                                <li className={`${contentFormat}`}>Recreation Center</li>
                                <li className={`${contentFormat}`}>12th and Wharton</li>
                                <li className={`${contentFormat}`}>Philadelphia, PA 19147</li>
                            </ul>
                        </div>
                        <div>
                            <div className={`flex gap-3 mb-2 content-end items-center ${contentFormat}`}>
                                <i class="fa-solid fa-phone"></i>
                                (215) 685-1590
                            </div>
                            <div className={`flex gap-3 mb-2 content-end items-center ${contentFormat}`}>
                                <i class="fa-solid fa-envelope"></i>
                                info@mycolumbussquarepark.org
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
