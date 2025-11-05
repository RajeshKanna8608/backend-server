const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  dynasty: { 
    type: String, 
    enum: ['Chera', 'Chozha', 'Pandiya', 'Mayura'],
    required: true 
  },
  kingdomLevel: { type: Number, default: 1 },
  resources: {
    food: { type: Number, default: 500 },
    wood: { type: Number, default: 500 },
    stone: { type: Number, default: 500 },
    gold: { type: Number, default: 100 },
    culture: { type: Number, default: 0 }
  },
  conqueredRegions: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', PlayerSchema);