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
	let whitelist = ['is', 'are', 'was', 'a', 'an', 'the', ' ', ...originalText.whitelist]

	let posWhitelist = ['CC', 'IN', 'MD', 'RP', 'SYM', 'CD', 'PRP', 'PP$', '.', ',', ':']

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

		if (lowerCaseOriginalText.indexOf(word) !== -1) {
			obj.plagiarized = true
		}

		if (whitelist.includes(originalCase[i]) || whitelist.includes(word)) {
			console.log('In the whitelist: ', obj.text)
			obj.plagiarized = false
		}

		if (posWhitelist.includes(obj.pos[0][1])) {
			console.log('In the POS whitelist: ', obj.text)
			obj.plagiarized = false
		}

		if (!obj.plagiarized) {
			obj.substitute = checkSubstitutions(originalText.subs, obj.text)
		}

		results.push(obj)
	}

	return results
}

const checkSubstitutions = function(substitutions, word) {
	return substitutions.indexOf(word) !== -1
}

const aggregateResults = function(wordAnalysis, lengthRatio) {
	let numPlagiarized = 0
	let numSubstitute = 0

	for (let i=0; i<wordAnalysis.length; i++) {
		let word = wordAnalysis[i]

		if (word.plagiarized) {
			numPlagiarized++
		} else if (word.substitute) {
			numSubstitute++
		}
	}

	if (numPlagiarized > 2) {
		return 12.5
	} else if (numSubstitute > 2) {
		return 37.5
	} else if (lengthRatio > .7) {
		return 62.5
	} else {
		return 87.5
	}
}

module.exports = (req, res) => {
	let originalText = req.body.originalText
	let summary = req.body.summary

	let wordAnalysis = checkPlagiarism(originalText, summary)
	let lengthRatio = summary.text.length / originalText.text.length
	let score = aggregateResults(wordAnalysis, lengthRatio)

	return res.status(200).json({
		words: wordAnalysis,
		lengthRatio: lengthRatio,
		score: score
	})
}
