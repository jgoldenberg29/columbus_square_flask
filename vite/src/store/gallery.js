import {setUser} from "./session"

const ALL_IMAGES = "images/getAll"


export const getAllImages = (images) => {
    return {
        type: ALL_IMAGES,
        images
    }
}


export const thunkGetAllImages = () => async dispatch => {
    const res = await fetch('api/instagram/auth')

    if (res.ok) {
        const data = await res.json()
        dispatch(getAllImages(data.images))
        return null
    } else {
        const data = await res.json()
        return data
    }
}


const imagesReducer = (state={}, action) => {
    switch(action.type) {
        case ALL_IMAGES:
            return [...action.images]
        default:
            return state
    }
}

export default imagesReducer
