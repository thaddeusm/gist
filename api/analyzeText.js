import pos from 'pos'

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
	let whitelist = ['is', 'are', 'was', 'a', 'an', 'the', ...originalText.whitelist]
	let posWhitelist = ['CC', 'IN', 'MD', 'RP', 'SYM', '.', ',', ':']

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
			pos: tagPartsOfSpeech(word),
			substitute: false
		}

		if (whitelist.indexOf(word) == -1 && posWhitelist.indexOf(obj.pos[0][1]) == -1) {
			if (lowerCaseOriginalText.indexOf(word) !== -1) {
				obj.plagiarized = true
			}
		}

		if (!obj.plagiarized) {
			obj.substitute = checkSubstitutions(originalText.substitutions, obj.text)
		}

		results.push(obj)
	}

	return results
}

const checkSubstitutions = function(substitutions, word) {
	return substitutions.indexOf(word) !== -1
}

const checkWordiness = function(originalText, summary) {

}

const arregateResults = function(results) {

}

module.exports = (req, res) => {
	let originalText = req.body.originalText
	let summary = req.body.summary

	let results = checkPlagiarism(originalText, summary)

	return res.status(200).json({
		words: results
	})
}
