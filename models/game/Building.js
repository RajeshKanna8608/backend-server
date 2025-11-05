const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  buildingType: { 
    type: String, 
    enum: ['KingsHall', 'Farm', 'LumberYard', 'Quarry', 'Market', 'Temple', 'Barracks', 'Watchtower', 'Storehouse'],
    required: true 
  },
  level: { type: Number, default: 1 },
  position: {
    x: { type: Number, required: true },
    y: { type: Number, required: true }
  },
  isUpgrading: { type: Boolean, default: false },
  upgradeFinishTime: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Building', BuildingSchema);