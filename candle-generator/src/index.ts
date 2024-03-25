import 'dotenv/config'
import axios from 'axios'

import Period from './enums/Period'
import Candle from './models/Candle'
import { createMessageChannel } from './messages/messageChannel'

async function readMarketPrice() {
	const { data } = await axios.get(process.env.PRICES_API!)

	return data.bitcoin.usd
} 

async function generateCandles() {
	const messageChannel = await createMessageChannel()

	if(messageChannel) {
		while(true) {
			const loopTimes = Period.ONE_MINUTE / Period.THIRTY_SECONDS
			const candle = new Candle('BTC', new Date())

			console.log('Gerando nova candle')

			for(let i = 0; i < loopTimes; i++) {
				const price = await readMarketPrice()

				console.log('Leitura ', i + 1, ' of ', loopTimes, ' - Preço: ', price)

				candle.addValue(price)

				await new Promise(r => setTimeout(r, Period.ONE_MINUTE))
			}

			candle.closeCandle()

			console.log('Candle fechada')

			const candleObj = candle.toSimpleObject()

			console.log(candleObj)

			const candleJSON = JSON.stringify(candleObj)

			messageChannel.sendToQueue(process.env.QUEUE_NAME!, Buffer.from(candleJSON))

			console.log('Candle enqueued')
		}
	}
}

generateCandles()