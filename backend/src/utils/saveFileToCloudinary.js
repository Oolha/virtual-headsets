import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs/promises';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const saveFileToCloudinary = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    const response = await cloudinary.uploader.upload(file.path, {
      folder: 'headsets',
      resource_type: 'auto',
      transformation: {
        width: 1000,
        crop: 'limit',
      },
    });

    try {
      await unlink(file.path);
    } catch (unlinkError) {
      console.error('Error deleting temporary file:', unlinkError);
    }

    return response.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);

    try {
      if (file && file.path) {
        await unlink(file.path);
      }
    } catch (unlinkError) {
      console.error(
        'Error deleting temporary file after upload failure:',
        unlinkError,
      );
    }

    throw new Error(`Failed to upload to Cloudinary: ${error.message}`);
  }
};

export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete from Cloudinary: ${error.message}`);
  }
};

export const getPublicIdFromUrl = (url) => {
  try {
    const urlParts = url.split('/');
    const filename = urlParts[urlParts.length - 1];
    const publicId = filename.split('.')[0];
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id from URL:', error);
    return null;
  }
};
