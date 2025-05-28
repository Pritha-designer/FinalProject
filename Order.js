const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({

customerName: String,
  phone: String,
  address: String,
  items: [{
    cracker_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cracker', required: true },
    name: String,
    price: Number,
    quantity: Number,
    // image:String,
    
  }],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
