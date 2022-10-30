import keys from "../keys";
const { createApi } = require("unsplash-js");

const unsplash = createApi({
    accessKey: keys.photo_key,
});


function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


async function UnsplashSearch(query,length,isRandomised) {
    const photo = await (unsplash.search.getPhotos({
        query,
        page:1,
        perPage:length,
        orientation:"landscape",
        orderBy:"latest"
    }))
    if(isRandomised && photo){
        if(photo){
            return(photo.response.results[getRandomArbitrary(0,20)].links.download)  
        }
    }
    return photo.response.results[0].links.download;
}

export default UnsplashSearch;