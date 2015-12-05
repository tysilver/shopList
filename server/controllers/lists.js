var mongoose = require('mongoose');
var List = mongoose.model('List');
var User = mongoose.model('User');
// var Post = mongoose.model('Post');

module.exports = (function(){
	return {
		add: function (req, res){
			User.findOne({_id: req.params.userId}, function (error, user){
				if (error) {
					console.log("we got errors getting one user in our lists.js add list method: ");
					console.log(error)
				} else {
					console.log("We got the one user! Now time to add the list to the user and user to list.");
					var newUserId = user._id;
					var new_list = new List({title: req.body.info.title, items: req.body.info.items, created_at: req.body.info.created_at});
					new_list.users.push(user);
					console.log("and now we created a new list.  It is: ")
					console.log(new_list)
					new_list.save(function (error1, list){
						if(error1){
							console.log("We have errors adding the new list: " + new_list.title)
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
		get_all: function(req, res){
			List.find({ users: req.params.userId } , function (err, data){
				if (err){
					console.log("We got an error getting all lists from this user")
					res.json({error: err})
				} else {
					console.log("We got all lists from this user in lists.js")
					res.json(data);
				}
			})
		},
		get_one: function(req, res){
			List.findOne({_id: req.params.listId}, function (err, data){
				if (err) {
					console.log("we got errors getting one list");
				} else {
					console.log("We got the one list!")
					res.json(data);
				}
			});
		},
		update_one: function(req, res){
			List.update({_id: req.body.info._id}, {title: req.body.info.title, items: req.body.info.items}, function(err, list) {
				if(err) {
					console.log("We have some errors to deal with getting the list...")
				} else {
					console.log(list)
					List.find({}, function (error, lists){
						if (error) {
							console.log("Error finding all lists")
						} else {
							console.log("Got all lists!")
							res.json(lists);
						}
					})
				}
			});
		},
		remove: function(req, res) {
			List.remove({_id: req.body.list._id}, function (err, data) {
				if (err) {
					console.log("We got an error removing the list.")
				} else {
					console.log(" - That was the list we removed?")
					User.update({}, {$pull: {lists: req.body.list._id }}, {multi: true}, function (error, data){
						if (error) {
							console.log("There was an error updating users")
							console.log(error)
						} else {
							console.log("updated all users")
						}
					})
					res.json(data)
				}
			});
		}
	}
})();

