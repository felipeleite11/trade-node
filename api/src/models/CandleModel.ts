import { model, Document, Schema } from 'mongoose'

export interface Candle extends Document {
	currency: string
	dateTime: Date
	open: number
	close: number
	low: number
	high: number
	color: string
	values: number[]
}

const schema = new Schema<Candle>({
	currency: { type: String, required: true },
	dateTime: { type: Date, required: true },
	open: { type: Number, required: true },
	close: { type: Number, required: true },
	high: { type: Number, required: true },
	low: { type: Number, required: true },
	color: { type: String, required: true }
})

export const CandleModel = model<Candle>('Candle', schema)