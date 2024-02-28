import { setUser } from "./session"

const ALL_NEWS = 'news/getAll'
const ADD_NEWS = 'news/createOne'
const UPDATE_NEWS = 'news/edit'
const DELETE_NEWS = 'news/delete'


export const getAllNews = (news) => {
    return {
        type: ALL_NEWS,
        news
    }
}

export const createNews = (news) => {
    return {
        type: ADD_NEWS,
        news
    }
}

export const editNews = (news) => {
    return {
        type: UPDATE_NEWS,
        news
    }
}

export const deleteNews = (newsId) => {
    return {
        type: DELETE_NEWS,
        newsId
    }
}


// thunks
export const thunkGetAllNews = () => async dispatch => {
    const res = await fetch('/api/news')

    if(res.ok) {
        const data = await res.json();
        dispatch(getAllNews(data.news))
        return null
    } else {
        const data = await res.json();
        return data
    }
}

export const thunkCreateNews = (news) => async dispatch => {
    const res = await fetch('/api/news', {
        method: "POST",
        body: news
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(createNews(data.news))
        dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkUpdateNews = (news, id) => async dispatch => {
    const res = await fetch(`/api/news/${id}`, {
        method: "PUT",
        body: news
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(editNews(data.news))
        dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkDeleteNews = (id) => async dispatch => {
    const res = await fetch(`/api/news/${id}`, {
        method: "DELETE"
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(deleteNews(id))
        dispatch(setUser(data.user))
        return null
    } else {
        const data = await res.json()
        return data
    }
}

export const thunkPostComment = (comment, newsId) => async dispatch => {
    const res = await fetch(`/api/news/${newsId}/comments`, {
        method: 'POST',
        body: comment,
    })

    if(res.ok) {
        const data = await res.json()
        dispatch(editNews(data.news))
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
        dispatch(editNews(data.news))
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
        dispatch(editNews(data.news))
        return null
    } else {
        const data = await res.json()
        return data
    }
}


const newsReducer = (state={}, action) => {
    console.log(action)
    switch (action.type) {
        case ALL_NEWS:
            const allNews = {};
            action.news.forEach(news => {
                allNews[news.id] = news
            });
            return allNews;
        case ADD_NEWS:
            return {...state, [action.news.id]: action.news};
        case UPDATE_NEWS:
            return {...state, [action.news.id]: action.news};
        case DELETE_NEWS:
            const newState = {...state};
            delete newState[action.newsId];
            return newState
        default:
            return state
    }
}


export default newsReducer

// import { createSlice, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
// import { fetchAll } from './allData'
// import fetch from './csrf'


// export const addNews = createAsyncThunk(
//     'news/add',
//     async (news, thunkAPI) => {
//         const res = await fetch("/api/news", {
//             method: "POST",
//             body: news
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

// export const updateNews = createAsyncThunk(
//     'news/update',
//     async (news, thunkAPI) => {
//         const res = await fetch(`/api/news/${news.id}`, {
//             method: "PUT",

//             body: news
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

// export const removeNews = createAsyncThunk(
//     'news/remove',
//     async (newsId, thunkAPI) => {
//         const res = await fetch(`/api/news/${newsId}`, {
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

// const newsSlice = createSlice({
//     name: 'news',
//     initialState: {all: {}, errors: {}},
//     reducers: {
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchAll.fulfilled, (state, action) => {
//             state.all = action.payload.news
//         });

//         builder.addCase(addNews.fulfilled, (state, action) => {
//             state.all[action.payload.news.id] = action.payload.news
//         });

//         builder.addCase(updateNews.fulfilled, (state, action) => {
//             state.all[action.payload.news.id] = action.payload.news
//         });

//         builder.addCase(removeNews.fulfilled, (state, action) => {
//             delete state.all[action.payload.id]
//         });
//     }
// })

// export default newsSlice.reducer
