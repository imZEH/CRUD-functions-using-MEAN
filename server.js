var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Phone = mongoose.model('Phone', { 
	name : String,
	Age: Number,
	Brand: String,
	Desc: String,
	image: String,
	price: Number
});

var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var router = express.Router();

app.use(bodyParser());

mongoose.connect('mongodb://localhost/Node');

app.use(express.static(__dirname + '/templates'));


// app.get('*', function(req, res){
// 	res.sendfile('index.html');
// })

// router.route('/')
// 	.get(function(req, res) {
// 		res.sendfile('index.hmtl');
// 	});

router.use(function(req, res, next){
	console.log('Something is happening');
	next();
});

router.route('/phones')
	.post(function(req, res){
		new Phone({
			name: req.body.name,
			Age: req.body.Age,
			Brand: req.body.Brand,
			Desc: req.body.Desc,
			image: req.body.image,
			price: req.body.price
		}).save(function(err,phone){
			if(err)
				res.send(err);
			res.json({message: 'Data Created!', _data:phone});
		})
	})
	.get(function(req, res){
		Phone.find(function(err, phones){
			if(err)
				res.send(err);
			res.json(phones);
		});
	});

router.route('/phones/:phone_id')
	.get(function(req, res){
		Phone.findById(req.params.phone_id, function(err, phone){
			if(err)
				res.send(err);
			res.json(phone);
		})
	})
	.put(function(req,res){
		Phone.findById(req.params.phone_id, function(err, phone){
			if(err)
				res.send(err);
			phone.name = req.body.name;
			phone.Age = req.body.Age;
			phone.Brand = req.body.Brand;
			phone.Desc = req.body.Desc;
			phone.image = req.body.image;
			phone.price = req.body.price;
			phone.save(function(err, phones, data){
				if(err)
					res.send(err);
				res.json({ message: 'Data updated!' , _data: phones });
			});
		});
	})
	.delete(function(req, res){
		Phone.remove({
			_id: req.params.phone_id
		}, function(err,phone){
			if(err)
				res.send(err);
			res.json({ message: 'Succesfully Deleted' });
		});
	});	

// 	router.get('/', function(req, res){
// 	res.json({ message: 'hooray! welcome to our api!'});
// });


app.use('/api', router);
app.listen(port);
console.log('App listening on port '+ port);

// app.get('/phones', function(req, res){
// 	Todo.find(function(err, phones){
// 		if(err)
// 			res.send(err)
// 		res.json(phones);
// 	});
// });

// app.post('/phones', function(req, res){
// 	Todo.create({
// 		text : req.body.text,
// 		done: false
// 	}, function(err, todo){
// 		if(err)
// 			res.send(err);

// 		Todo.find(function(err, phones){
// 			if(err)
// 				res.send(err)
// 			res.json(phones);
// 		});
// 	});
// });


// app.delete('/phones/:todo_id', function(req, res){
// 	Todo.remove({
// 		_id : req.params.todo_id
// 	}, function(err, todo){
// 		if(err)
// 			res.send(err);

// 		Todo.find(function(err, phones){
// 			if(err)
// 				res.send(err)
// 			res.json(phones);
// 		});
// 	});
// });


