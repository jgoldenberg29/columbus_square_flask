import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import MobileLogo from '../Navigation/mobile-logo';


export default function Footer() {


    return (
        <div className="w-full bg-green-900">
            <div className='flex flex-col md:flex-row justify-center gap-10 px-8 py-12'>
                <div className='flex flex-col max-w-80 gap-3 px-3'>
                    <h2 className='text-yellow-300 text-2xl font-newspaper'>About</h2>
                    <p className='text-white pr-3'>Columbus Square Park is a vibrant community gathering place located between 12th and 13th Streets and Wharton and Reed streets in the Passyunk Square neighborhood in South Philadelphia.</p>
                </div>
                <div className='flex flex-col gap-3 px-3'>
                    <h2 className='text-yellow-300 text-2xl font-newspaper'>Related Links</h2>
                    <div className='text-white flex flex-col'>
                        <Link to="https://www.phila.gov/departments/philadelphia-parks-recreation/" className='hover:underline'>Philadelphia Parks & Recreation</Link>
                        <Link to="https://www.facebook.com/groups/241921246469738/" className='hover:underline'>South Philadelphia Dog Owners Association (SPDOA)</Link>
                        <Link to="https://www.drpipes.com/pa/philadelphia.html" className='hover:underline'>Plumbers Near Philadelphia</Link>
                    </div>
                </div>
                <div className='flex flex-col gap-3 px-3'>
                    <h2 className='text-yellow-300 text-2xl font-newspaper'>Contact</h2>
                    <div>
                        <div className='text-white flex gap-2 content-end'>
                            <i class="fa-solid fa-phone"></i>
                            (123) 456-7890
                        </div>
                        <div className='text-white flex gap-2 content-end'>
                            <i class="fa-solid fa-envelope"></i>
                            admin@csp.org
                        </div>
                        <div className='text-white flex gap-2 content-end'>
                            <i class="fa-brands fa-facebook"></i>
                            <Link to="https://www.facebook.com/friendsofcolumbussquare/" className='hover:underline'>Join us on Facebook!</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
