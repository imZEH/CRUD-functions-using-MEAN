var assert = require('assert');
var request = require('request');
var should = require('should');
var URL = 'http://localhost:8080/api/phones';

describe('NODEJS Testing', function(){
	var Pid = '';
	var aname = ['Samsung S5','Samsung Gen','Nokia 2082','Optimusf3','Samsung Galaxy','Samsung Galaxy Tab'];
	var aage = [1,2,3,4,5,6];
	var abrand = ['Samsung','Samsung','Nokia','Optimus','Samsung','Samsung'];
	var aimage = ['img/samsungs511t.png','img/samsungs511t.png','img/nokia2082.png','img/Optimusf3.png','img/galaxyyoung.png','img/iphone4s.png']

	describe('POST', function(){
		it('function should save data to db', function (){
		 for (var i=1 ; i<= aname.length; i++) {
	      var text = aname[i];
	      var text1 = aage[i];
	      var text2 = abrand[i];
	      var text3 = aimage[i];
	   
				var phones = { name: text , Age: text1 , Brand: text2 , Desc: 'Sold out', image: text3, price: 100};
				var options = { url: URL , method: 'POST' , form: phones };
				request(options, function (error, res, body){
					body = JSON.parse(body);
					should.not.exist.error(error);
					res.statusCode.should.equal(200);
					body.should.be.containEql({ message: 'Data Created!',id:phone._id});
					Pid =phone._id;
				});
			}
		});
	});

	describe('GET',function(){
		it('the data from the API', function (done){
			request(URL, function (error, res, body){
				body = JSON.parse(body);
				should.not.exist(error);
				res.statusCode.should.equal(200);
				body.should.be.instanceOf(Array);
				body.length.should.be.above(0);
				done();
			});
		});
	});
	describe('GET',function(){
		it('one data from the API', function (done){
			request(URL + '/' + Pid, function (error, res, body){
				body = JSON.parse(body);
				should.not.exist(error);
				res.statusCode.should.equal(200);
				body.should.be.instanceOf(Object);
				done();
			});
		});
	});

	describe('PUT', function(){
		it('data from db', function (done){
			var phones = { name: 'wwww', Age: 161, Brand: 'w' , Desc: 'sample'};
			var options = { url : URL + '/' + Pid, method: 'PUT', form: phones};
			request(options, function (error, response, body){
				body = JSON.parse(body);
				should.not.exist(error);
				response.statusCode.should.equal(200);
				body.message.should.containEql('Data updated!');
				done();
			});
		});
	});
	
	describe('DELETE', function(){
		it('data from db', function (done){
			var options = { url: URL + '/' + Pid, method: 'DELETE'};
			request(options, function (error, res, body){
				body = JSON.parse(body);
				should.not.exist(error);
				res.statusCode.should.equal(200);
				body.should.be.containEql({message: 'Succesfully Deleted'});
				done();
			});
		});
	});
});