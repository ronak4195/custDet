const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleModel: { type: String, required: true },
});

module.exports = mongoose.model('Record', RecordSchema);
