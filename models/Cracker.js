
const mongoose = require('mongoose');


const crackerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image:{type:String, required:true}
// }, { timestamps: true });
});
const Cracker = mongoose.model('Cracker', crackerSchema);
module.exports = Cracker;
