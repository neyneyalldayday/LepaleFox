import React, { useState } from 'react';
import { uploadPhoto } from '../../utils/Api';

const PhotoUploadForm = ({ postId }) => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    const validFiles = selectedFiles.filter(file => 
    ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
    );
    
    setFiles(validFiles);

    if(validFiles.length > selectedFiles.length) {
      alert('some files were rejected, only images')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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
      setError(error.message || 'upload failed , lets try again?')  
    } finally {
      setLoading(false)
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
      <button type="submit"  disabled={loading}>
        { loading  ?'Uploading...':'Upload Photos'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};

export default PhotoUploadForm;