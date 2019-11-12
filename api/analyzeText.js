import pos from 'pos'

var substitutionPool = []

const tagPartsOfSpeech = function(text) {
	let words = new pos.Lexer().lex(text)
	let tagger = new pos.Tagger()

	let result = tagger.tag(words)

	if (result[0]) {
		return tagger.tag(words)
	} else {
		return [text, 'none']
	}
}

const formatText = function(text, options) {
	let formattedText = text

	if (options.indexOf('no punctuation') !== -1) {
		let punctuationRemoved = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
		formattedText = punctuationRemoved.replace(/\s{2,}/g," ")
	}

	if (options.indexOf('lower case') !== -1) {
		formattedText = formattedText.toLowerCase()
	}

	return formattedText
}

const checkPlagiarism = function(originalText, summary) {
	let whitelist = ['is', 'are', 'was', ...originalText.whitelist]
	let posWhitelist = ['CC', 'IN', 'MD', 'RP', '.', ',', ':']

	let results = []

	let lowerCaseSummary = formatText(summary.text, ['lower case'])

	let lowerCaseOriginalText = formatText(originalText.text, ['lower case'])

	let wordsToCheck = lowerCaseSummary.split(/([.,\/#!$%\^&\*;:{}=\-_`~() ])/)
	let originalCase = summary.text.split(/([.,\/#!$%\^&\*;:{}=\-_`~() ])/)
	for (let i=0; i<wordsToCheck.length; i++) {
		let word = wordsToCheck[i]

		let obj = {
			text: originalCase[i],
			plagiarized: false,
			pos: tagPartsOfSpeech(word)
		}

		if (whitelist.indexOf(word) == -1 && posWhitelist.indexOf(obj.pos[0][1]) == -1) {
			if (lowerCaseOriginalText.indexOf(word) !== -1) {
				obj.plagiarized = true
			}
		}

		//

		results.push(obj)
	}

	return results
}

const checkSubstitutions = function(originalText, text) {
	if (substitutionPool.length == 0) {
		let arr = formatText(originalText, ['no punctuation']).split(' ')
		
		// loop through original text words
		for (let i=0; i<arr.length; i++) {
			let word = arr[i]

			// send request for synonyms like this https://api.datamuse.com/words?rel_syn=give
				// push returned synonyms to pool
		}

		console.log(substitutionPool)
	}

	// loop through words in summary (obj from plagiarism check?)

		// if the word is not plagiarised, check for match in synonym pool


}

const checkWordiness = function(originalText, summary) {

}

const arregateResults = function(results) {

}

module.exports = (req, res) => {
	let originalText = req.body.originalText
	let summary = req.body.summary

	let plagiarismResults = checkPlagiarism(originalText, summary)
	// checkSubstitutions(originalText.text)

	return res.status(200).json({
		plagiarism: plagiarismResults
	})
}
