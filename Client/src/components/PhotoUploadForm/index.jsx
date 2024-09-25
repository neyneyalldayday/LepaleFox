import React, { useState } from 'react';
import { uploadPhoto } from '../../utils/Api';

const PhotoUploadForm = ({ postId }) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('photos', file);
    });
    formData.append('description', description);
    formData.append('postId', postId);
    try {        
      const response = await uploadPhoto(formData);
      console.log('Upload successful', response.data);      
    } catch (error) {
      console.error('Upload failed', error);      
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple onChange={handleFileChange} />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Photo description"
      />
      <button type="submit">Upload Photos</button>
    </form>
  );
};

export default PhotoUploadForm;