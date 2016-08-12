const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;


// -----------------------
// PRAYR LISTS
// -----------------------
const prayrSchema = new Schema({
	title: {type: String, required: false},
	to: {type: String, required: false},
	from: {type:String, required: false},
	reply_to: {type:String},
	description: {type: String, required: true},
	category: {type: String},
	answered: {type: Boolean, default: false},
  answeredStatus: {type: Boolean, default: false},
  viewStatus: {type: Boolean, default: false}
})

const myPersonalPrayrSchema = new Schema({
  to: {type: String, required: true},
  description: {type: String, required: true},
  answered: {type: Boolean, default: false}
  
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
  Prayr: createModel('Prayr', prayrSchema),
  PersonalPrayr: createModel('PersonalPrayr', myPersonalPrayrSchema)
}
