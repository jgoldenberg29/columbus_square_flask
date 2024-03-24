import { useState } from 'react';
import { useLogin, useLogout } from '../../context/login';
import ManageAccount from './account';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from '../../context/form';
import EventFormModal from '../EventFormModal'
import AdminCreateEvent from './event';
import AdminNews from './news';
import ManageAdmins from './admin';

export default function Dashboard() {
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user.user) || {}

    if (!user) navigate('/')

    const [view, setView] = useState('account');

    const { showLogout, setShowLogout } = useLogout();
    const {
        showForm,
        setShowForm,
        showRemove,
    } = useForm()

    return (
        <div className="px-4 md:px-8 lg:w-4/5 mx-auto">
            <h1 className='text-3xl pb-3 border-b border-gray-300'>Dashboard</h1>
            <div className='flex flex-col md:grid md:grid-cols-4 '>
                <div className="hidden md:flex md:flex-col pr-2 gap-2 pt-6">
                    <button onClick={() => setView('account')} className={`py-3 rounded-lg hover:bg-gray-100 hover:text-rose-500  ${view === 'account' && 'text-cyan-700 bg-cyan-100'}`}>
                        Manage Account
                    </button>
                    <button onClick={() => setView('event')} className={`py-3 rounded-lg hover:bg-gray-100 hover:text-rose-500 ${view === 'event' && 'text-cyan-700 bg-cyan-100'}`}>
                        Create Event
                    </button>
                    <button onClick={() => setView('news')} className={`py-3 rounded-lg hover:bg-gray-100 hover:text-rose-500 ${view === 'news' && 'text-cyan-700 bg-cyan-100'}`}>
                        Post Announcement
                    </button>
                    <button onClick={() => setView('admins')} className={`py-3 rounded-lg hover:bg-gray-100 hover:text-rose-500 ${view === 'admins' && 'text-cyan-700 bg-cyan-100'}`}>
                        Manage Admins
                    </button>
                    <button onClick={() => setShowLogout(true)} className={`py-3 rounded-lg hover:bg-gray-100 hover:text-rose-500 ${view === 'logout' && 'text-cyan-700 bg-cyan-100'}`}>
                        Logout
                    </button>
                </div>
                <div className="flex md:hidden">
                    <select value={view} onChange={(e) => setView(e.target.value)} className="py-2 px-1 border border-gray-300 rounded-md w-full" style={{ position: 'relative' }}>
                        <option value={'account'} style={{ top: '0', left: '0' }}>Manage Account</option>
                        <option value={'event'} style={{ top: '0', left: '0' }}>Create Event</option>
                        <option value={'news'} style={{ top: '0', left: '0' }}>Post Announcement</option>
                        <option value={'admins'} style={{ top: '0', left: '0' }}>Manage Admins</option>
                    </select>
                </div>
                <div className='md:pl-12 md:col-span-3 pt-6 md:pt-10 md:min-h-screen md:border-l md:border-gray-300'>
                    {view === 'account' && <ManageAccount />}
                    {view === 'event' && <AdminCreateEvent />}
                    {view === 'news' && <AdminNews />}
                    {view === 'admins' && <ManageAdmins />}
                </div>
            </div>
            {/* {showForm && <EventFormModal/>} */}
        </div>
    )
};
