var sync = require('synchronize');
var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;
var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'inventory'
});
const bodyParser = require('body-parser');

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
  
}






const express = require('express')
const app = express()
app.set('view engine', 'ejs');
const port = 3000
//connection.connect()

app.use(bodyParser.urlencoded({ extended: false }));

//connection.end()
	var array = [];
	 getAllItemsQuery();
	
function getAllItemsQuery() { 

 connection.query('SELECT * FROM items', function (err, rows, fields) {
		array = [];
  if (err) throw err



  
		  rows.forEach(function(element) {
		  console.log(element.name);
	 var t = new Item();
		 t.qty=element.qty;
		 t.name = element.name;
		 t.id = element.id;
		 		 t.amount= element.amount;
		 array.push(t);
		 
		});
	
})

} 

app.get('/', function(req, res) {


			getAllItemsQuery();



res.send(array);

});


	 var tt = new Item();

app.get('/:tagId', function(req, res) {
	tt = new Item();
		connection.query('SELECT * FROM items WHERE items.id = ?',[req.params.tagId], function (err, rows, fields) {
  if (err) throw err


  
		  rows.forEach(function(element) {
		
	
		 tt.qty=element.qty;
		tt.name = element.name;
		tt.id = element.id;
		 		 tt.amount= element.amount;
res.send(tt);
		});
	
})



});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


app.delete('/d/:tagId', function(req, res) {
	let sql = `DELETE FROM items WHERE items.id = ?`;
   let post = [req.params.tagId];
    connection.query(sql, post, (err, result) => {
        if(err){
            console.log(err)
        }
 
     

    });
	
  res.send("tagId is set to " + req.params.tagId);
});

app.post('/', function(req, res) {
			var t = new Item();
		 t.qty=req.body._qty;
		 t.name = req.body._name;

		 t.amount = req.body._amount;
console.log("inserting");


 let sql = "INSERT INTO items (id, name, qty, amount) VALUES (?,?, ?, ?)";
   let post = [null,t.name,t.qty, t.amount];
    connection.query(sql, post, (err, result) => {
        if(err){
            console.log(err)
        }
 
     

    });

res.sendStatus(200);
 })
 

app.put('/', function(req, res) {
			var t = new Item();
			t.id = req.body._id;
		 t.qty=req.body._qty;
		 t.name = req.body._name;

		 t.amount = req.body._amount;

            console.log("editing"+JSON.stringify(t, null, 4));


 let sql = 'UPDATE items SET name = "'+t.name+'", qty = "'+t.qty+'", amount = "'+t.amount+'" WHERE items.id = '+ req.body._id;
   let post = [t.name,t.qty, t.amount,t.id];
    connection.query(sql, post, (err, result) => {
            console.log("editing"+JSON.stringify(result, null, 4));

        if(err){
            console.log(err)
        }
 
     

    });

	
	
res.sendStatus(200);
 })
 