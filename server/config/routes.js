var users = require('../controllers/users.js')
var lists = require('../controllers/lists.js')
// var posts = require('../controllers/posts.js')
// var comments = require('../controllers/comments.js')

module.exports = function(app){
	app.get('/users', function (req, res){
		users.get_all(req, res);
	});
	app.post('/newUser', function (req, res){
		console.log(req.body.info.name + " made it to the newUser function.")
		users.add(req, res);
	});
	app.get('/oneUser/:user_id', function (req, res){
		users.get_one(req, res);
	});
	app.get('/newestUser', function (req, res){
		users.newest(req, res);
	});
	app.post('/friendship/:otherUserId', function (req, res){
		users.friendship(req, res);
	});
	app.post('/unfriend/:userId', function (req, res){
		users.unfriend(req, res);
	});
	app.post('/newList/:userId', function (req, res){
		lists.add(req, res);
	});
	app.get('/lists/:userId', function (req, res){
		lists.get_all(req, res);
	});
	app.get('/oneList/:listId', function (req, res){
		lists.get_one(req, res);
	});
	app.post('/updateList/:userId', function (req, res){
		lists.update_one(req, res);
	});
	app.post('/removeList', function (req, res){
		lists.remove(req, res);
	});
}