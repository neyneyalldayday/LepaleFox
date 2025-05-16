// Add this to your posts router file
const router = require("express").Router()
const multer = require('multer');
const sequelize = require('../../config/connection');
const { Post, Photo } = require("../../models")
const { apiGuard } = require("../../utils/authGuard")

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 25 * 1024 * 1024, // 5MB limit per file
    },
    fileFilter: (req, file, cb) => {
      if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only image files (jpeg, png, gif) are allowed'), false);
      }
    }
  });
  
  // Combined post and photo upload route
  router.post('/with-photos', apiGuard, upload.array('photos'), async (req, res) => {
    let transaction;
    
    try {
        transaction = await sequelize.transaction();
      // Extract text fields from the form
      const { title, body, description } = req.body;
      const files = req.files || [];
  
      // Validate required fields
      if (!title || !body) {
        throw new Error('Title and body are required');
      }
  
      // Create the post within transaction
      const newPost = await Post.create({
        title,
        body,
        userId: req.session.user_id
      }, { transaction });
  
      // Process photos if any were uploaded
      if (files.length > 0) {
        await Promise.all(
          files.map(async (file) => {
            await Photo.create({
              title: file.originalname,
              description: description || '',
              data: file.buffer, // Using BLOB storage
              contentType: file.mimetype,
              postId: newPost.id,
              userId: req.session.user_id
            }, { transaction });
          })
        );
      }
  
      // Commit the transaction
      await transaction.commit();
  
      // Fetch the complete post with photos
      const completePost = await Post.findByPk(newPost.id, {
        include: [{
          model: Photo,
          attributes: ['id', 'title', 'description', 'contentType', 'createdAt']
        }]
      });
  
      res.status(201).json(completePost);
    } catch (err) {
      // Rollback transaction on error
       // Only rollback if transaction exists and hasn't been committed
    if (transaction && !transaction.finished) {
        await transaction.rollback();
      }
      
      console.error('Upload error:', err);
      
      console.error('Error in /with-photos:', err);
      
      // Handle different error types
      if (err.message.includes('file size')) {
        res.status(400).json({ error: 'File too large (max 25MB)' });
      } else if (err.message.includes('Invalid file type')) {
        res.status(400).json({ error: 'Only JPEG, PNG, or GIF images allowed' });
      } else if (err.message.includes('required')) {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'Failed to create post' });
      }
    }
  });
  


module.exports = router