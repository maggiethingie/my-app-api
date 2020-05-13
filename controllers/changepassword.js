const handlePasswordChange = (req, res, db, bcrypt)  => {
	console.log(req.body);
	const { id, newPassword } = req.body;
	if (!id || !newPassword) {
		return res.status(400).json('incorrect form submission');
	}
	const hash = bcrypt.hashSync(newPassword);
	db('users').where('id', '=', id).update({
		hash: hash
	}).returning('*')
	.then(updatedUser => res.json(updatedUser[0]))
	.catch(err => res.status(400).json(err))
}

module.exports = { handlePasswordChange };