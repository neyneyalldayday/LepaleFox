const multer = require('multer');
const router = require('express').Router()
const { Photo } = require('../../models/'); // Adjust the path as needed


// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('photos', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(file => {
      return Photo.create({
        title: file.originalname,
        description: req.body.description, // You can modify this to accept multiple descriptions
        data: file.buffer,
        contentType: file.mimetype,
        userId: req.session.userId,
        postId: req.body.postId,
      });
    });

    const uploadedPhotos = await Promise.all(uploadPromises);

    res.json({
      message: 'Photos uploaded successfully',
      data: {
        photoIds: uploadedPhotos
      }
      
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Error uploading photos' });
  }
});

// Example of retrieving a photo
router.get('/photo/:id', async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id, {
      attributes: ['data']
    });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.setHeader('Content-Type', `image/png || image/jpg`); // Assuming the image format is PNG
    res.status(200).send(photo.data);
  } catch (error) {
    console.error('Retrieval error:', error);
    res.status(500).json({ error: 'Error retrieving photo' });
  }
})

router.get('/photo', async (req, res) => {
  try {
    const photos = await Photo.findAll();
    if (!photos) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    const photoArray = photos.map((photo) => photo.get({plain: true}))
    console.log(photoArray)
    res.status(200).json(photoArray)
  } catch (error) {
    console.error('Retrieval error:', error);
    res.status(500).json({ error: 'Error retrieving photo' });
  }
})


module.exports = router;