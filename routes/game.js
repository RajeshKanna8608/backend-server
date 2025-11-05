const express = require('express');
const router = express.Router();
const Player = require('../models/game/Player');
const Building = require('../models/game/Building');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Game API is working!' });
});

// Create new player
router.post('/player/create', async (req, res) => {
  try {
    const { userId, username, dynasty } = req.body;
    
    const existingPlayer = await Player.findOne({ userId });
    if (existingPlayer) {
      return res.status(400).json({ error: 'Player already exists' });
    }

    const player = new Player({ userId, username, dynasty });
    await player.save();

    res.json({ success: true, player });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get player data
router.get('/player/:userId', async (req, res) => {
  try {
    const player = await Player.findOne({ userId: req.params.userId });
    if (!player) {
      return res.status(404).json({ error: 'Player not found' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;