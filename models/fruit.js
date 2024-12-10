const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: {type: String, required: true},
    isReadyToEat: Boolean,
    price: {type: mongoose.Schema.Types.Decimal128, min: 0},
});

const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;