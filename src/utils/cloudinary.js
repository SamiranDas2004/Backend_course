import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';       

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY_, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


const uploadOnCloudnary= async (localFilePath)=>{
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
      const response= await cloudinary.uploader.upload(
            localFilePath,{
                resource_type:"auto"
            }
        )
        fs.unlinkSync(localFilePath)
        console.log( 'response is:',response)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)// removed the localy saved files as the uplode operation got failed
        return null;
    }
}

export {uploadOnCloudnary}