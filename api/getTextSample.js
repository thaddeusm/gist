import textSamples from './textSamples.json'

const shuffle = function(arr) {
	var j, x, i
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = arr[i]
        arr[i] = arr[j]
        arr[j] = x
    }

    return arr
}

const getSample = function(level) {
	console.log(level)
	// isolate samples with matching level
	let allSamples = textSamples.samples
	let samples = []

	for (let i=0; i<allSamples.length; i++) {
		let sample = allSamples[i]

		if (sample.level == level) {
			samples.push(sample)
		}
	}

	// shuffle list of matching samples
	let shuffledSamples = shuffle(samples)

	// return first text sample from shuffled list
	return shuffledSamples[0]
}

module.exports = (req, res) => {
	let level = req.query.level

	let sample = getSample(level)

	console.log(sample)

	return res.status(200).json(sample)
}
