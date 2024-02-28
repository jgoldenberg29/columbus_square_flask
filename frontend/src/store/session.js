// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (credentials) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: credentials.email,
            password: credentials.password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const newUser = (firstName, lastName, username, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			'first_name': firstName,
			'last_name': lastName,
			username,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null };
		default:
			return state;
	}
}


// import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// import { addEvent } from './events'


// export const authenticate = createAsyncThunk(
//     'session/authenticate',
//     async (thunkAPI) => {
//         const res = await fetch("/api/auth/")
//         if (res.ok) {
//             const data = await res.json()
//             return data
//         } else {
//             const data = await res.json()
//             return data
//         }
//     }
// )

// export const login = createAsyncThunk(
//     'session/login',
//     async (credentials, thunkAPI) => {
//         const res = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 email: credentials.email,
//                 password: credentials.password,
//             })
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

// export const logout = createAsyncThunk(
//     'session/logout',
//     async (thunkAPI) => {
//         const res = await fetch("/api/session", {
//             method: "DELETE"
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

// const sessionSlice = createSlice({
//     name: 'session',
//     initialState: {user: null, errors: null},
//     reducers: {
//         // login: (state, action) => {
//         //     state.user = action.payload
//         // },
//         // logout: (state) => {
//         //     state.user = null
//         // }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(authenticate.fulfilled, (state, action) => {
//             state.user = action.payload.user
//         })

//         builder.addCase(login.fulfilled, (state, action) => {
//             state.user = action.payload.user || null
//             state.errors = action.payload.errors || null
//         })

//         builder.addCase(logout.fulfilled, (state, action) => {
//             state.user = null
//         })

//         builder.addCase(addEvent.rejected, (state, action) => {
//             console.log('ADD EVENT REJECTED')
//             console.log(action)

//             state.errors = action.error
//         });

//     }
// })

// export default sessionSlice.reducer
// // export const { login, logout } = sessionSlice.actions
