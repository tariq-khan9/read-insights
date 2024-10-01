import axios from 'axios'

export const fileUploadToStrapi = async (file) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await axios.post(`${process.env.REACT_APP_STRAPI_URL}/api/upload`, formData);
      return response.data[0]?.id; // Get the ID of the uploaded image
    } catch (error) {
      console.error('Image upload error:', error);
      return null;
    }
  };