const multer = require('multer');
const router = require('express').Router()
const { Photo } = require('../../models/');
const Sequelize = require('sequelize');

// Configure multer for memory storage
const upload = multer({ storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }
 });

router.post('/', upload.array('photos', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadPromises = req.files.map(file => {
      return Photo.create({
        title: file.originalname,
        description: req.body.description, 
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
        photoIds: uploadedPhotos.map(photo => photo.id)
      }      
    });
  } catch (error) {
    console.error('Upload error:', error);
    if (error instanceof Sequelize.ConnectionError) {
      return res.status(503).json({ error: 'Database connection error. Please try again later.' });
    }
    if (error instanceof Sequelize.DatabaseError) {
      return res.status(500).json({ error: 'Database error. Please try again later.' });
    }
    res.status(500).json({ error: 'Error uploading photos' });
  }
});


router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Max size is 25MB.' });
    }
  }
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

router.get('/photo/:id', async (req, res) => {
  try {
    const photo = await Photo.findByPk(req.params.id, {
      attributes: ['data', 'contentType']
    });
    if (!photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }
    res.set('Content-Type', photo.contentType);
    return res.status(200).send(photo.data);
  } catch (error) {
    console.error('Retrieval error:', error);
    return res.status(500).json({ error: 'Error retrieving photo' });
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