const handleShowListings = (req, res, db) => {
	const { region } = req.params;

	db.select('*').from('shows').where({region})
		.returning('*')
		.then(showsInRegion => res.json(showsInRegion))
		.catch(err => res.status(400).json('error getting listings'));
}

module.exports = { handleShowListings };