import React, { createContext, useContext, useState, useEffect } from 'react';

const CalendarContext = createContext();

export function CalendarProvider({children}) {
    const [selectedEvent, setSelectedEvent] = useState(null);

    return (
        <CalendarContext.Provider value={{ selectedEvent, setSelectedEvent }}>
            {children}
        </CalendarContext.Provider>
    );
}

export function useCalendar() {
    return useContext(CalendarContext);
};
