const handleRegister = (req, res, db, bcrypt)  => {
	console.log(req.body);
	const { email, name, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password);
	db('users').insert({
			name: name,
			email: email,
			hash: hash			
	}).returning('*')
	.then(newUser => res.json(newUser[0]))
	.catch(err => res.status(400).json(err))
}

module.exports = { handleRegister };

