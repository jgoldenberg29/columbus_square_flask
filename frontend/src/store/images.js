import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { fetchAll } from './allData'

// const initialState = {
//     images: {}
// }

export const addImage = createAsyncThunk(
    'images/add',
    async (image, thunkAPI) => {
        const res = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                image
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

export const removeImage = createAsyncThunk(
    'images/remove',
    async (image, thunkAPI) => {
        const res = await fetch("", {
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

const imageSlice = createSlice({
    name: 'images',
    initialState: {},
    reducers: {
        // addImage: (state, action) => {
        //     state.images[action.payload.id] = action.payload
        // },
        // removeImage: (state, action) => {
        //     delete state.images[action.payload.id]
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAll.fulfilled, (state, action) => {
            state.images = action.payload.images
        });

        builder.addCase(addImage.fulfilled, (state, action) => {
            state.images[action.payload.id] = action.payload
        });

        builder.addCase(removeImage.fulfilled, (state, action) => {
            delete state.images[action.payload.id]
        });
    }
})

export default imageSlice.reducer
// export const { addImage, removeImage } = imageSlice.actions
