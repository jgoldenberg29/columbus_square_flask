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
