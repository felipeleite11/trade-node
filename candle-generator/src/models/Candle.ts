import CandleColor from "../enums/CandleColor"

export default class Candle {
	low: number
	high: number
	open: number
	close: number
	color: CandleColor
	dateTime?: Date
	values: number[]
	currency: string

	constructor(currency: string, initialDateTime: Date) {
		this.dateTime = initialDateTime
		this.currency = currency
		this.low = Infinity
		this.high = 0
		this.close = 0
		this.open = 0
		this.values = []
		this.color = CandleColor.UNDETERMINED
	}

	addValue(value: number) {
		this.values.push(value)

		if(this.values.length === 1) {
			this.open = value
		}

		if(this.low > value) {
			this.low = value
		}

		if(this.high < value) {
			this.high = value
		}
	}

	closeCandle() {
		if(this.values.length > 0) {
			this.close = this.values.at(-1) as number
			this.dateTime = new Date()
			this.color = this.open > this.close ? CandleColor.RED : CandleColor.GREEN
		}
	}

	toSimpleObject() {
		const { values, ...obj } = this

		return obj
	}
}