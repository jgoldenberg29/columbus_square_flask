import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const ReactCalendar = () => {


    // console.log("EVENTS: ", events)

    const events = [
        {
          title: 'First Event at the new park',
          start: new Date('Tue, 20 Mar 2024 14:12:01 GMT'), // Transform displayDate and displayTime into start
          // end: new Date('Tue, 20 Mar 2024 16:12:01 GMT'), // Transform displayDate and displayTime into end
          description: 'Everybody welcome',
          location: '12th Street',
          poster: {
            admin: true,
            email: 'columbussquarepark@gmail.com',
            eventsPosted: [],
            id: 1,
            name: 'Steve'
          },
          flyer: 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png'
        },
        {
          title: 'Second Event at the new park',
          start: new Date('Tue, 20 Mar 2024 15:12:01 GMT'), // Transform displayDate and displayTime into start
          end: new Date('Tue, 20 Mar 2024 17:12:01 GMT'), // Transform displayDate and displayTime into end
          description: 'Everybody welcome',
          location: '12th Street',
          poster: {
            admin: true,
            email: 'columbussquarepark@gmail.com',
            eventsPosted: [],
            id: 1,
            name: 'Steve'
          },
          flyer: 'https://www.kitshouse.org/wp-content/uploads/2017/07/picnic_in_the_park_poster-kitscc.png'
        }
      ];


    return (
        <div style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ fontSize: 12, zIndex: 10 }} // Adjust font size as needed
            />
        </div>
    );
};

export default ReactCalendar;
