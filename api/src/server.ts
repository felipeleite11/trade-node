import 'dotenv/config'
import { connection } from 'mongoose'

import { app } from './app'
import { connectToMongoBD } from './config/db'
import CandleMessageChannel from './messages/CandleMessageChannel'

const port = process.env.PORT

async function createServer() {
	await connectToMongoBD()

	const server = app.listen(port, () => {
		console.log('Executando na porta ', port)
	})

	const candleMsgChannel = new CandleMessageChannel(server)

	candleMsgChannel.consumeMessages()

	process.on('SIGINT', async () => {
		await connection.close()
		
		server.close()

		console.log('Server was ended')
	})
} 

createServer()