import cloudinary from './saveFileToCloudinary.js';
import fs from 'fs/promises';
import path from 'path';

export const uploadImage = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'virtual_headsets',
    });
    return result.secure_url;
  } catch (error) {
    console.error(`Error loading image: ${imagePath}`, error.message);
    return null;
  }
};

export const uploadImagesFromFolder = async (folderPath) => {
  try {
    const files = await fs.readdir(folderPath);
    const imageUrls = [];

    for (const file of files) {
      const imagePath = path.join(folderPath, file);
      const imageUrl = await uploadImage(imagePath);
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    }

    console.log('Uploaded image URLs:', imageUrls);
    return imageUrls;
  } catch (error) {
    console.error('Error loading images from folder', error.message);
    return [];
  }
};

const imagesFolder = '../public/images/virtual-headsets';
uploadImagesFromFolder(imagesFolder);
