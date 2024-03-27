import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCalendar } from '../../context/calendar';

const localizer = momentLocalizer(moment);

const ReactCalendar = ({ events }) => {
  const { selectedEvent, setSelectedEvent } = useCalendar();

  const newEvents = events.map((event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    return { ...event, start, end };
  })

  const CustomToolbar = ({ label, onNavigate, onView }) => (
    <div className="flex justify-between mb-4">
      <div className="flex items-center border rounded z-10">
          <button type="button" onClick={() => onNavigate('PREV')} className="px-3 py-1 hover:text-blue-500 hover:bg-slate-200 border-r">
            <i class="fa-solid fa-caret-left"></i>
          </button>
          <button type="button" onClick={() => onNavigate('NEXT')} className="px-3 py-1 hover:text-blue-500 hover:bg-slate-200">
            <i class="fa-solid fa-caret-right"></i>
          </button>
      </div>
      <div className="absolute inset-x-0 absolute inset-x-0 flex justify-center">
        <h2 className="text-xl mr-2">{label}</h2>
      </div>
      <div className="flex items-center border rounded z-10">
          <button type="button" onClick={() => onView('month')} className="px-3 py-1 hover:text-blue-500 hover:bg-slate-200 border-r">Month</button>
          <button type="button" onClick={() => onView('week')} className="px-3 py-1 hover:text-blue-500 hover:bg-slate-200">Week</button>
      </div>
    </div>
  );

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };


  return (
    <div style={{ height: 700 }}>
      <Calendar
        localizer={localizer}
        events={newEvents}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week']}
        style={{ }}
        components={{
          toolbar: CustomToolbar
        }}
        onSelectEvent={handleEventClick}
      />
    </div>
  );
};

export default ReactCalendar;
