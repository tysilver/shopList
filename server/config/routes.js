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
	app.post('/newList/:userId', function (req, res){
		lists.add(req, res);
	});
	app.get('/lists/:userId', function (req, res){
		lists.get_all(req, res);
	});
	// app.get('/oneTopic/:topic_id', function (req, res){
	// 	topics.get_one(req, res);
	// });
	// app.get('/newestTopic', function (req, res){
	// 	topics.get_newest(req, res)
	// });
	// app.post('/removeTopic', function (req, res){
	// 	topics.remove(req, res);
	// });
	// app.post('/newPost/:topicId', function (req, res){
	// 	posts.add(req, res);
	// });
	// app.get('/topicPosts/:topicId', function (req, res){
	// 	posts.getPosts(req, res);
	// });
	// app.post('/addComment', function (req, res){
	// 	comments.add(req, res);
	// });
	// app.get('/getAllComments', function (req, res){
	// 	comments.getAll(req, res);
	// });
}