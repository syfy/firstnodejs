var http = require('http');
const bodyParser = require('body-parser');

const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const port = 3001
//connection.connect()

const request = require('request');
//var justAGuy = new Person();
//justAGuy.name = 'martin'; // The setter will be used automatically here.
//justAGuy.sayHello(); // Will output 'Hello, my name is Martin, I have ID: id_1'
app.disable('view cache');

class Item {
  constructor() {
    this.id = null;
  }
  
    set id(id) {
    this._id = id;
  }
  get amount() {
    return this._id;
  }
  set amount(amount) {
    this._amount = amount;
  }
  get amount() {
    return this._amount;
  }
  
    set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  
  
    set qty(qty) {
    this._qty =qty;
		}	
  get qty() {
    return this._qty
  }
  //sayHello() {
  //  console.log('Hello, my name is ' + this.name + ', I have ID: ' + this.id);
  //}
}




app.use(bodyParser.urlencoded({ extended: false }));



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// server.js
		
		
							
var json;
// index page 

app.get('/', function(req, res) {
	const url = "http://127.0.0.1:3000/";
					request.get(url, (error, response, body) => {
			   json = JSON.parse(body);
			 

			  	res.render('pages/index', {
						  inventories: json,

						});
			  
			});
					
				 console.log(json);
					
		
		
		
});

app.get('/new', function(req, res) {

					
				res.render('pages/new_forrm', {
					

						});
					
				json=null;
		
});

app.get('/m/:tagId', function(req, res) {
				const url = "http://127.0.0.1:3000/"+req.params.tagId;
					request.get(url, (error, response, body) => {
			  let json = JSON.parse(body);
			  console.log(body);
			  inv = json;
			  	res.render('pages/modify_form', {
						  json: json,

						});
			  
			});
					
				
			});
	



function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}


app.post('/m/:tagId', function(req, res) {
			var t = new Item();
					 t.id=req.params.tagId;

		 t.qty=req.param('qty');
		 t.name = req.param('name');
		 t.amount =req.param('amount');
			
							request.put({
				headers: {'content-type': 'application/json'},
				url: 'http://127.0.0.1:3000/',
				form: t
			}, function(error, response, body){
			  console.log(body)
			  
			  if(response.body=="OK"){
			const urlz = "http://127.0.0.1:3000/";
					request.get(urlz, (error, response, body) => {
			

		
						  res.redirect('../');
					});
					
			  }
	

			});
						

				
				
		     console.log("editing"+JSON.stringify(t, null, 4));
	
});

app.post('/new', function(req, res) {
			
									var t = new Item();
								t.qty=req.param('qty');
								t.name = req.param('name');
								t.amount = req.param('amount');
					
								


						request.post({
							headers: {'content-type': 'application/json'},
							url: 'http://127.0.0.1:3000/',
							form: t
						}, function(error, response, body){
						  console.log(body)
						});
													
											const urlz = "http://127.0.0.1:3000/";
					request.get(urlz, (error, response, body) => {
			

		
						  res.redirect('../');
					});
					
});



app.get('/del/:tagId', function(req, res) {
			
				
	
				


request.delete({
    headers: {'content-type': 'application/json'},
    url: 'http://127.0.0.1:3000/d/'+req.params.tagId
    
}, function(error, response, body){
  console.log(body)
});
							
					const urlz = "http://127.0.0.1:3000/";
					request.get(urlz, (error, response, body) => {
			

		
						  res.redirect('../');
					});
					
			
				  	
			  
});


