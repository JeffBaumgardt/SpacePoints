export const number = (number, options, locales) => {
	number = Number(number)
	if (isNaN(number)) {
		return '0'
	}
	return number.toLocaleString(locales, options)
}

export const integer = num => {
	return number(Math.floor(Number(num)))
}

export const fraction = (num, numDigits) => {
	numDigits = typeof numDigits === 'number' ? numDigits : 2
	return number(num, {
		minimumFractionDigits: numDigits,
		maximumFractionDigits: numDigits,
	})
}

export const percentage = (num, numDigits) => {
	numDigits = typeof numDigits === 'number' ? numDigits : 2
	// Convert 99.5 into "99%" instead of "100%".
	if (numDigits === 0) {
		num = Math.floor(num * 100) / 100
	}
	return number(num, {
		style: 'percent',
		minimumFractionDigits: numDigits,
		maximumFractionDigits: numDigits,
	})
}
