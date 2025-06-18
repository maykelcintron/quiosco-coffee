export function getImagePathCloudinary(imagePath: string){
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'

    if(imagePath.startsWith(cloudinaryBaseUrl)){
        return imagePath
    }else{
        return `/products/${imagePath}.jpg`
    }
}