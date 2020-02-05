const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY = 'SELECT * FROM react_sql.create_table';
const DELETE_PRODUCT_QUERY = ''

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'kirafaith123',
	database: 'react_sql'
});

connection.connect(err => {
	if (err) {
		return err;
	}
});

console.log(connection);

app.use(cors());

app.get('/', (req, res) => {
	res.send('hello from the products server')
});

app.get('/products/add', (req, res) => {
	const{ fname, lname } = req.query;
	const INSERT_PRODUCTS_QUERY = `INSERT INTO create_table(fname, lname) VALUES('${fname}','${lname}')`
	connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
		if (err) {
			return res.send(err)
		} else {
			return res.send('successfully added product')
		}
	})	
})

app.get('/products/remove', (req, res) => {
	const{ fname, lname } = req.query;
	const INSERT_PRODUCTS_QUERY = `DELETE FROM create_table where fname = '${fname}' and lname = '${lname}'`
	connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
		if (err) {
			return res.send(err)
		} else {
			return res.send('successfully removed product')
		}
	})	
})

app.get('/products', (req, res) => {
	connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
		if (err) {
			return res.send(err)
		} else {
			return res.json({
				data: results
			})
		}

	})
});

app.listen(4000, () => {
	console.log('Product server listening on port 4000')
});