var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: String,
	created_at: Date,
	lists: [{type: Schema.Types.ObjectId, ref: 'List'}],
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	// comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('User', UserSchema);