const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// GET all locations
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    const locations = await Location.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: locations, count: locations.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET single location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }
    res.json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create new location
router.post('/', async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).json({ success: true, data: location });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// PUT update location
router.put('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!location) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }
    res.json({ success: true, data: location });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// DELETE location
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ success: false, error: 'Location not found' });
    }
    res.json({ success: true, message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET locations by bounds (for map viewport)
router.get('/bounds/search', async (req, res) => {
  try {
    const { minLat, maxLat, minLng, maxLng } = req.query;
    const locations = await Location.find({
      'coordinates.lat': { $gte: parseFloat(minLat), $lte: parseFloat(maxLat) },
      'coordinates.lng': { $gte: parseFloat(minLng), $lte: parseFloat(maxLng) }
    });
    res.json({ success: true, data: locations, count: locations.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
