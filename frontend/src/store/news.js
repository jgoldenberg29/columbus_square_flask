import { createSlice, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import { fetchAll } from './allData'
import fetch from './csrf'


export const addNews = createAsyncThunk(
    'news/add',
    async (news, thunkAPI) => {
        const res = await fetch("/api/news", {
            method: "POST",
            body: news
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

export const updateNews = createAsyncThunk(
    'news/update',
    async (news, thunkAPI) => {
        const res = await fetch(`/api/news/${news.id}`, {
            method: "PUT",

            body: news
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

export const removeNews = createAsyncThunk(
    'news/remove',
    async (newsId, thunkAPI) => {
        const res = await fetch(`/api/news/${newsId}`, {
            method: "DELETE",
        })
        if (res.ok) {
            const data = await res.json()
            return data
        } else {
            const data = await res.json()
            return isRejectedWithValue(data)
        }
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState: {all: {}, errors: {}},
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.all = action.payload.news
        });

        builder.addCase(addNews.fulfilled, (state, action) => {
            state.all[action.payload.news.id] = action.payload.news
        });

        builder.addCase(updateNews.fulfilled, (state, action) => {
            state.all[action.payload.news.id] = action.payload.news
        });

        builder.addCase(removeNews.fulfilled, (state, action) => {
            delete state.all[action.payload.id]
        });
    }
})

export default newsSlice.reducer
