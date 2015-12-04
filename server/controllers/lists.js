var mongoose = require('mongoose');
var List = mongoose.model('List');
var User = mongoose.model('User');
// var Post = mongoose.model('Post');

module.exports = (function(){
	return {
		add: function (req, res){
			User.findOne({_id: req.body.info.userId}, function (error, user){
				if (error) {
					console.log("we got errors getting one user in our lists.js add list method: ");
					console.log(error)
				} else {
					console.log("We got the one user! Now time to add the list to the user and user to list.");
					var newUserId = user._id;
					var new_list = new List({title: req.body.info.title, items: req.body.info.items, created_at: req.body.info.created_at});
					new_list.users.append = newUserId;
					console.log("and now we created a new list.  It is: ")
					console.log(new_list)
					new_list.save(function (error1, list){
						if(error1){
							console.log("We have errors adding the new list: " + new_list.list)
						}else{
							console.log("We added the new list!")
							User.update({_id: req.params.userId}, {$push: {lists: list}}, function (err, user) {
							    if (err) {
							        console.log("We have some errors to deal with.")
							    } else {
							        console.log(user)
							    }
							});
							console.log(list)
							res.json(list);
						}
					});
				}
			});
		},
	// 	get_all: function(req, res){
	// 		User.find({}, function (err, data){
	// 			if (err){
	// 				console.log("We got an error getting all users")
	// 				res.json({error: err})
	// 			} else {
	// 				console.log("We got all users in users.js")
	// 				res.json(data);
	// 			}
	// 		})
	// 	},
	// 	get_one: function(req, res){
	// 		User.findOne({_id: req.params.user_id}, function (err, data){
	// 			if (err) {
	// 				console.log("we got errors getting one user");
	// 			} else {
	// 				console.log("We got the one user!")
	// 				res.json(data);
	// 			}
	// 		});
	// 	},
	// 	newest: function(req, res) {
	// 		User.findOne({}, {}, { sort: { 'created_at' : -1 } }, function (err, data) {
	// 			if (err) {
	// 				console.log("We got an error finding the newest user.")
	// 			} else {
	// 				console.log(data)
	// 				console.log(" - That was the newest user.")
	// 				res.json(data)
	// 			}
	// 		});
	// 	}
	}
})();

