
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

//user shcema
const UserSchema = new mongoose.Schema({
 firstName:{
   type: String,
   default: ''
 },
 lastName: {
   type: String,
   default: ''
 },
 email:{
   type: String,
   default: ''
 },
 password: {
   type: String,
   default: ''
 },
 isDeleted: {
   type: Boolean,
   default: false
 },
 signUpDate: {
   type: Date,
   default: Date.now()
 }
});

//generates a hashed password
UserSchema.methods.generateHash = function(password) {
 return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
};
//checks if password matches when trying to log in
UserSchema.methods.validPassword = function(password) {
 return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
