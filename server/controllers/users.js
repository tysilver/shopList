var mongoose = require('mongoose');
var List = mongoose.model('List');
var User = mongoose.model('User');
// var Post = mongoose.model('Post');

module.exports = (function(){
	return {
		get_all: function(req, res){
			User.find({}, function (err, data){
				if (err){
					console.log("We got an error getting all users")
					res.json({error: err})
				} else {
					console.log("We got all users in users.js")
					res.json(data);
				}
			})
		},
		add: function (req, res){
			var new_user = new User({name: req.body.info.name, created_at: req.body.info.created_at});
			new_user.save(function (err, data){
				if(err){
					console.log("We have errors adding the new person: " + req.body.info.name)
				}else{
					console.log("We added the new customer!")
					console.log(data)
					res.json(data)
				}
			})
		},
		get_one: function(req, res){
			User.findOne({_id: req.params.user_id}, function (err, data){
				if (err) {
					console.log("we got errors getting one user");
				} else {
					console.log("We got the one user!")
					res.json(data);
				}
			});
		},
		newest: function(req, res) {
			User.findOne({}, {}, { sort: { 'created_at' : -1 } }, function (err, data) {
				if (err) {
					console.log("We got an error finding the newest user.")
				} else {
					console.log(data)
					console.log(" - That was the newest user.")
					res.json(data)
				}
			});
		}
	}
})();