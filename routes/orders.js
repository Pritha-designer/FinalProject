const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cracker = require('../models/Cracker');

// POST /api/orders - Place a new order
router.post('/', async (req, res) => {
  
const{customerName, phone, address, items}=req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No items in the order.' });
  }

  // if (!customerId || !name || !mobileNo || !address) {
  //   return res.status(400).json({ message: 'Customer details are required.' });
  // }

  try {
       // Check availability and update stock
    let totalPrice = 0;
const processedItems = [];
    for (const item of items) {
      const cracker = await Cracker.findById(item.crackerId);
      if (!cracker) {
        return res.status(404).json({ message: `Cracker not found: ${item.crackerId}` });
      }
      if (cracker.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${cracker.name}` });
      }

      cracker.quantity -= item.quantity;
      await cracker.save();

     
       processedItems.push({
        cracker_id: cracker._id,
        name: cracker.name,
        price: cracker.price,
        quantity: item.quantity
    });
     totalPrice += cracker.price * item.quantity;
  }
  
    const order = new Order({
    customerName,
      phone,
      address,
       items: processedItems,
      totalPrice,
    
      createdAt: new Date()

    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    console.error('Order placement failed:', err);
    res.status(500).json({ message: 'Server error while placing order' });
  }
});


// GET /api/orders - Get all orders (Admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({orders});
  } catch (err) {
    console.error('Fetching orders failed:', err);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
});

module.exports = router;
