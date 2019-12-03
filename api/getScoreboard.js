const MongoClient = require('mongodb').MongoClient

const uri = process.env.MONGO_URL

const getScores = async function() {
	let docs = []
	const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

	try {
		await client.connect()

		const db = client.db('GistScoreboard')

		const collection = db.collection('SimpleScores')

		results = await collection.find().sort({'a': -1}).toArray()

		results.forEach((doc, err) => {
			docs.push(doc)
		})

	} catch(err) {
		console.log(err)
	}

	client.close()

	return docs
}

module.exports = (req, res) => {
	getScores().then((results) => {
		return res.status(200).json({
			results: results
		})
	}).catch(err => {
		console.log(err)
	})
}
