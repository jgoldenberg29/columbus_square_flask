// import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// const initialState = {
//     imageIds: []
// }

// const gallerySlice = createSlice({
//     name: 'gallery',
//     initialState,
//     reducers: {
//     },
//     extraReducers: (builder) => {
//         builder.addCase('allData/getAllData', (state, action) => {
//             state.imageIds = action.payload.imageIds
//         });

//         builder.addCase('images/add', (state, action) => {
//             if (action.payload.gallery === true){
//                 state.imageIds.push(action.payload.id)
//             }
//         });

//         builder.addCase('images/remove', (state, action) => {
//             const index = state.imageIds.indexOf(action.payload)
//             if (index !== -1) {
//                 state.imageIds.splice(index, 1)
//             }
//         })
//     }
// })

// export default gallerySlice.reducer
