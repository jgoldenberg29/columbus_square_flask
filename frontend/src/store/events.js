import { setUser } from "./session"

const ALL_EVENTS = 'events/getAll'
const ADD_EVENT = 'events/createOne'
const UPDATE_EVENT = 'events/edit'
const DELETE_EVENT = 'events/delete'


export const getAllEvents = (events) => {
    return {
        type: ALL_EVENTS,
        events
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

export const thunkCreateEvent = (event) => async dispatch => {
    const res = await fetch('/api/events', {
        method: "POST",
        body: event
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createEvent(data.event))
        dispatch(setUser(data.user))
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
        dispatch(setUser(data.user))
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
        dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkPostComment = (comment, eventId) => async dispatch => {
    const res = await fetch(`/api/events/${eventId}/comments`, {
        method: 'POST',
        body: comment,
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editEvent(data.event))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkEditComment = (comment, commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: comment,
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editEvent(data.event))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkDeleteComment = (commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editEvent(data.event))
        return null
    } else {
        const data = await res.json()
        return data
    }
}


const eventReducer = (state={}, action) => {
    switch (action.type) {
        case ALL_EVENTS:
            const allEvents = {};
            action.events.forEach(event => {
                allEvents[event.id] = event
            });
            return allEvents;
        case ADD_EVENT:
            return {...state, [action.event.id]: action.event};
        case UPDATE_EVENT:
            return {...state, [action.event.id]: action.event};
        case DELETE_EVENT:
            const newState = {...state};
            delete newState[action.eventId];
            return newState
        default:
            return state
    }
}


export default eventReducer


// import { createSlice, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
// import { fetchAll } from './allData'
// import fetch from './csrf'


// export const addEvent = createAsyncThunk(
//     'events/add',
//     async (event, thunkAPI) => {
//         const res = await fetch("/api/events", {
//             method: "POST",
//             // headers: {
//             //     "Content-Type": "application/json",
//             // },
//             body: event
//         })
//         if (res.ok) {
//             const data = await res.json()
//             return data
//         } else {
//             const data = await res.json()
//             return data
//         }
//     }
// )

// export const updateEvent = createAsyncThunk(
//     'events/update',
//     async (event, thunkAPI) => {
//         const res = await fetch(`/api/events/${event.id}`, {
//             method: "PUT",
//             // headers: {
//             //     "Content-Type": "application/json",
//             // },
//             body: event
//         })
//         if (res.ok) {
//             const data = await res.json()
//             return data
//         } else {
//             const data = await res.json()
//             return data
//         }

//     }
// )

// export const removeEvent = createAsyncThunk(
//     'events/remove',
//     async (eventId, thunkAPI) => {
//         const res = await fetch(`/api/events/${eventId}`, {
//             method: "DELETE",
//         })
//         if (res.ok) {
//             const data = await res.json()
//             return data
//         } else {
//             const data = await res.json()
//             return isRejectedWithValue(data)
//         }
//     }
// )

// const eventSlice = createSlice({
//     name: 'events',
//     initialState: {all: {}, errors: {}},
//     reducers: {
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchAll.fulfilled, (state, action) => {
//             state.all = action.payload.events
//         });

//         builder.addCase(addEvent.fulfilled, (state, action) => {
//             state.all[action.payload.event.id] = action.payload.event
//         });

//         builder.addCase(updateEvent.fulfilled, (state, action) => {
//             state.all[action.payload.event.id] = action.payload.event
//         });

//         builder.addCase(removeEvent.fulfilled, (state, action) => {
//             delete state.all[action.payload.id]
//         });
//     }
// })

// export default eventSlice.reducer
// // export const { addEvent, updateEvent, removeEvent } = eventSlice.actions
