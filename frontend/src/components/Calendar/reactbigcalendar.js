import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ReactCalendar = ({ eventsArr }) => {
    const events = eventsArr.map((event) => {

    })

    console.log("EVENTS: ", events)

    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="displayDate"
                endAccessor="end"
                style={{ fontSize: 12 }} // Adjust font size as needed
            />
        </div>
    );
};

export default ReactCalendar;
