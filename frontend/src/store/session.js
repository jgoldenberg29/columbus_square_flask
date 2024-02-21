import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'


export const authenticate = createAsyncThunk(
    'session/authenticate',
    async (thunkAPI) => {
        try {
            const res = await fetch("/api/auth/")
            if (res.ok) {
                const data = await res.json()
                return data
            }
        //     else {
        //         const data = await res.json()
        //         return data
        // }
        } catch (error) {
            const errors = error.json()
            return errors
        }
    }
)

export const login = createAsyncThunk(
    'session/login',
    async (credentials, thunkAPI) => {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
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

export const logout = createAsyncThunk(
    'session/logout',
    async (thunkAPI) => {
        const res = await fetch("/api/session", {
            method: "DELETE"
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

const sessionSlice = createSlice({
    name: 'session',
    initialState: {user: null, errors: null},
    reducers: {
        // login: (state, action) => {
        //     state.user = action.payload
        // },
        // logout: (state) => {
        //     state.user = null
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(authenticate.fulfilled, (state, action) => {
            state.user = action.payload.user
        })

        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user || null
            state.errors = action.payload.errors || null
        })

        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null
        })

        // builder.addCase(addEvent.rejected, (state, action) => {
        //     console.log('ADD EVENT REJECTED')
        //     console.log(action)

        //     state.errors = action.error
        // });

    }
})

export default sessionSlice.reducer
// export const { login, logout } = sessionSlice.actions
