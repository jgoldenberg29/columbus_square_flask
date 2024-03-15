import React, { useRef, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';

const FullCalendar = () => {
    const calendarRef = useRef(null);

    useEffect(() => {
        const calendarEl = calendarRef.current;
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin],
            initialView: 'dayGridMonth', // Show the calendar in month view initially
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
            },
            events: [
                // Add your events here
                { title: 'Event 1', start: '2024-02-21' },
                { title: 'Event 2', start: '2024-02-22', end: '2024-02-24' }
            ]
        });
        calendar.render();

        return () => {
            calendar.destroy(); // Cleanup when component unmounts
        };
    }, []);

    return (
        <div ref={calendarRef} className='text-xs'>
            <style>
                {`
                    .fc-header-toolbar .fc-button {
                        padding: 0.25rem 0.5rem;
                        font-size: 0.75rem;
                    }
                `}
            </style>
        </div>
    );
};

export default FullCalendar;
