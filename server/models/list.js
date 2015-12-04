var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new mongoose.Schema({
	title: String,
	created_at: Date,
	updated_at: Date,
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	items: [],
	// posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
	// comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('List', ListSchema);