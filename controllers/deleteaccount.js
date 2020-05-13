const handleDeleteAccount = (req, res, db) => {
	//const { id } = req.params;
	const { id } = req.body;
	db.select('*').from('users').where({id}).del()
		.then(res.send("account deleted"))
		.catch(err => res.status(400).json('error deleting account'));

}

module.exports = { handleDeleteAccount };