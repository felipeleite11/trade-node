export default class Candle {
	currency: string = ''
	dateTime: Date = new Date()
	open: number = 0
	close: number = 0
	low: number = 0
	high: number = 0
	
	constructor(candleObj: any) {
		Object.assign(this, candleObj)

		this.dateTime = new Date(this.dateTime)
	}
}