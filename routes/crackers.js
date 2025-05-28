const express = require('express');
const router = express.Router();
const Cracker = require('../models/Cracker');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });
router.get('/', async (req, res) => {
  const crackers = await Cracker.find();
  res.json(crackers);
});

// router.post('/', async (req, res) => {
//   const cracker = new Cracker(req.body);
//   await cracker.save();
//   res.json(cracker);
// });
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, type, quantity, price } = req.body;
    const image = req.file?.filename;

    if (!name || !type || !quantity || !price || !image) {
      return res.status(400).json({ message: 'All fields including image are required' });
    }

    const cracker = new Cracker({
      name,
      type,
      quantity,
      price,
      image
    });
  await cracker.save();
    res.status(201).json(cracker);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add cracker', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  const cracker = await Cracker.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cracker);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  

  console.log("Received ID:", id);


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deleted = await Cracker.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Cracker not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } 
  catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ message: 'Server error while deleting' });
  }
});

module.exports = router;
