import cloudinary from "cloudinary";   
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,  
  secure: true
})

const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.v2.uploader.upload_stream(
      { folder: "nominees" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Error uploading image"));
        }
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
}

const deleteImage = async (imageUrl) => {
  try {
    const parts = imageUrl.split("/");
    const folderAndFile = parts.slice(parts.indexOf("nominees")).join("/");
    const publicId = folderAndFile.replace(/\.[^/.]+$/, "");
    await cloudinary.v2.uploader.destroy(publicId);
  } catch (err) {
    console.error("Cloudinary delete error:", err);
  }
}

export { uploadImage, deleteImage };