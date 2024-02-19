import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { fetchAll } from './allData'
import fetch from './csrf'


export const addEvent = createAsyncThunk(
    'events/add',
    async (event, thunkAPI) => {
        const res = await fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                event
            })
        })
        if (res.ok) {
            const data = await res.json()
            return data
        } else {
            const data = await res.json()
            return data
        }
    }
)

export const updateEvent = createAsyncThunk(
    'events/update',
    async (event, thunkAPI) => {
        const res = await fetch(`/api/events/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                event
            })
        })
        if (res.ok) {
            const data = await res.json()
            return data
        } else {
            const data = await res.json()
            return data
        }

    }
)

export const removeEvent = createAsyncThunk(
    'events/remove',
    async (eventId, thunkAPI) => {
        const res = await fetch(`/api/events/${eventId}`, {
            method: "DELETE",
        })
        if (res.ok) {
            const data = await res.json()
            return data
        } else {
            const data = await res.json()
            return data
        }
    }
)

const eventSlice = createSlice({
    name: 'events',
    initialState: {all: {}},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.all = action.payload.events
        });

        builder.addCase(addEvent.fulfilled, (state, action) => {
            state.all[action.payload.event.id] = action.payload.event
        });

        builder.addCase(updateEvent.fulfilled, (state, action) => {
            state.all[action.payload.event.id] = action.payload.event
        });

        builder.addCase(removeEvent.fulfilled, (state, action) => {
            delete state.all[action.payload.id]
        });
    }
})

export default eventSlice.reducer
// export const { addEvent, updateEvent, removeEvent } = eventSlice.actions
