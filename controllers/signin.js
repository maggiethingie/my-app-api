const handleSignin = (req, res, db, bcrypt)  => {
	console.log(req.body);
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('incorrect form submission');
	}
	db.select('email', 'hash').from ('users')
		.where('email', '=', email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users')
							.where('email', '=', email)
							.then(user => {
								res.json(user[0])
							})
							.catch(err => res.status(400).json('error signing in'))
			} else {
				res.status(400).json('wrong password');
			}
		})
	.catch(err => res.status(400).json('wrong email'));
}

module.exports = { handleSignin };

