import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
	name: String,
	address: String
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)
