// const MongoClient = require('mongodb').MongoClient

// // Connection URL
// const username = process.env.DB_USERNAME
// const password = process.env.DB_PASSWORD

// const uri = 'mongodb+srv://' + username + ':' + password + '@gistscoreboard-38uak.mongodb.net/test?retryWrites=true&w=majority'

// // Database Name
// const dbName = 'GistScoreboard'
// const scoreCollection = 'SimpleScores'

// const getScores = async function() {
// 	let docs = []
// 	const client = new MongoClient(uri, { useNewUrlParser: true })

// 	try {
// 		await client.connect()

// 		const db = client.db(dbName)

// 		const collection = db.collection(scoreCollection)

// 		results = await collection.find().sort({'a': -1}).toArray()

// 		results.forEach((doc, err) => {
// 			docs.push(doc)
// 		})

// 	} catch(err) {
// 		console.log(err)
// 	}

// 	client.close()

// 	return docs
// }

// module.exports = (req, res) => {
// 	let originalText = req.body.originalText
// 	let summary = req.body.summary

// 	getSynonyms(originalText).then(() => {
// 		let wordAnalysis = checkPlagiarism(originalText, summary)
// 		let lengthRatio = summary.text.length / originalText.text.length
// 		let score = aggregateResults(wordAnalysis, lengthRatio)

// 		return res.status(200).json({
// 			words: wordAnalysis,
// 			lengthRatio: lengthRatio,
// 			score: score
// 		})
// 	})
// }
