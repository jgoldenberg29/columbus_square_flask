
const fetchAll = (dispatch, getAllEvents, getAllNews) => {
    fetch("/api/getAllData")
      .then((res) => res.json())
      .then((data) => {
        dispatch(getAllEvents(data.events));
        // dispatch(getAllNews(data.news));
      });
  };

  export default fetchAll;

// import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// const initialState = {
//     loaded: false
// }


// export const fetchAll = createAsyncThunk(
//     'allData/getAllData',
//     async (thunkAPI) => {
//         const res = await fetch("/api/getAllData")
//         if (res.ok) {
//             const data = await res.json()
//             return data
//         } else {
//             const data = await res.json()
//             return data
//         }

//     }
// )

// const allDataSlice = createSlice({
//     name: 'allData',
//     initialState,
//     reducers: {
//         // loadData: (state, action) => {
//         //     state.loaded = true
//         // },
//         // removeData: (state, action) => {
//         //     state.loaded = false
//         // }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(fetchAll.fulfilled, (state) => {
//             state.loaded = true
//         });
//     }
// })

// export default allDataSlice.reducer
