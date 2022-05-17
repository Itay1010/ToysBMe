
// FETCH
const uploadImg = async (ev) => {
    // Defining our variables
    const UPLOAD_PRESET = 'toy_proj' // Insert yours
    const CLOUD_NAME = 'duajnavtn' // Insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    // Building the request body
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    // Sending a post method request to Cloudniarys' API
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })
        const elImg = document.createElement('img');
        const { url } = await res.json()
        elImg.src = url;
        return elImg
    } catch (err) {
        console.error('ERROR!', err)
    }
}