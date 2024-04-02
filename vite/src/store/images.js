

export const createImageFileAndUrl = (image) => async (dispatch) => {
    console.log('HELLO FROM IMAGE THUNK')
    const formData = new FormData();
    formData.append("image", image);

    const res = await fetch("/api/images/create", {
        method: "POST",
        body: formData
    });

    const data = await res.json();
    return data;
};
