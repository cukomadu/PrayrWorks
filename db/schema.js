const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;


// -----------------------
// PRAYR LISTS
// -----------------------
const prayrSchema = new Schema({
	title: {type: String, required: true},
	to: {type: String, required: true},
	from: {type:String, required: true},
	reply_to: {type:String},
	description: {type: String, required: true},
	category: {type: String},
	answered: {type: Boolean, default: false},
  answeredStatus: {type: Boolean, default: false},
  viewStatus: {type: Boolean, default: false}
})


// ----------------------
// USERS
// ----------------------
const usersSchema = new Schema({
  // required for authentication: DO NOT TOUCH Or You May Get Punched
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  // x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
  
   // example of optional additional fields
  name:      { type: String },
  createdAt: { type: Date, default: Date.now }

})

module.exports = {
  User: createModel('User', usersSchema),
  Prayr: createModel('Prayr', prayrSchema)
}
