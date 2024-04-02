import { setUser } from "./session"

const ALL_EVENTS = 'events/getAll'
const SORTED_EVENTS = 'events/getSorted'
const ADD_EVENT = 'events/createOne'
const UPDATE_EVENT = 'events/edit'
const DELETE_EVENT = 'events/delete'


export const getAllEvents = (events) => {
    return {
        type: ALL_EVENTS,
        events
    }
}

export const getSortedEvents = (sorted) => {
    return {
        type: SORTED_EVENTS,
        sorted
    }
}

export const createEvent = (event) => {
    return {
        type: ADD_EVENT,
        event
    }
}

export const editEvent = (event) => {
    return {
        type: UPDATE_EVENT,
        event
    }
}

export const deleteEvent = (eventId) => {
    return {
        type: DELETE_EVENT,
        eventId
    }
}

// thunks
export const thunkGetAllEvents = () => async dispatch => {
    const res = await fetch('/api/events')

    if(res.ok) {
        const data = await res.json();
        dispatch(getAllEvents(data.events))
        return null
    } else {
        const data = await res.json();
        return data
    }
}

export const thunkGetSortedEvents = () => async dispatch => {
    const res = await fetch('/api/events/sorted')

    if (res.ok) {
        const data = await res.json();
        dispatch(getSortedEvents(data['sorted']));
        return;
    } else {
        const data = res.json();
        return data
    }
}

export const thunkCreateEvent = (event) => async dispatch => {
    console.log('HELLO')
    const res = await fetch('/api/events', {
        method: "POST",
        // headers: { 'Content-Type': 'application/json'},
        body: event
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createEvent(data.event))
        dispatch(setUser(data.user))
        dispatch(thunkGetSortedEvents())
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkUpdateEvent = (event, id) => async dispatch => {
    const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        body: event
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editEvent(data.event))
        // dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkDeleteEvent = (id) => async dispatch => {
    const res = await fetch(`/api/events/${id}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(deleteEvent(id))
        // dispatch(setUser(data.user))
        // dispatch(thunkGetSortedEvents())
        return null
    } else {
        const data = await res.json()
        return data
    }
}

const initialState = { all: {}, sorted: [], single: {} }

const eventReducer = (state=initialState, action) => {
    switch (action.type) {
        case ALL_EVENTS:
            const allEvents = {};
            action.events.forEach(event => {
                allEvents[event.id] = event
            });
            // return allEvents;
            return {...state, all: allEvents}
        case SORTED_EVENTS:
            return { ...state, sorted: action.sorted }
        case ADD_EVENT:
            return {...state, all: { ...state.all, [action.event.id]: action.event } };
        case UPDATE_EVENT:
            return {...state, all: { ...state.all, [action.event.id]: action.event } };
        case DELETE_EVENT:
            const newState = { ...state };
            delete newState.all[action.eventId];
            return newState
        default:
            return state
    }
}

export default eventReducer
