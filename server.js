const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const http = require('http');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const deleteaccount = require('./controllers/deleteaccount');
const changepassword = require('./controllers/changepassword');
const showlistings = require('./controllers/showlistings');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'goldfish',
		database: 'mydb'
	}
});

db.select('*').from('users').then(data => {
	console.log(data);
})

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send('this is working'); })

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt) })

app.put('/changepassword', (req, res) => {
	changepassword.handlePasswordChange(req, res, db, bcrypt) })

// app.put('/delete/:id', (req, res) => {
app.put('/delete', (req, res) => {
	deleteaccount.handleDeleteAccount(req, res, db) })

app.get('/showlistings/:region', (req, res) => {
	showlistings.handleShowListings(req, res, db) })

app.get('/profile/:id', profile.handleProfileGet(db) )

app.listen(3002, () => { console.log("app is running on port 3002") })

