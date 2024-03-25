import { Channel, ConsumeMessage, connect } from 'amqplib'
import 'dotenv/config'
import { Server } from 'socket.io'
import http from 'http'

import CandleController from '../controllers/CandleController'
import { Candle } from '../models/CandleModel'

export default class CandleMessageChannel {
	private _channel?: Channel
	private _candleCtrl: CandleController
	private _io: Server

	constructor(server: http.Server) {
		this._candleCtrl = new CandleController()
		this._io = new Server(server, {
			cors: {
				origin: process.env.SOCKET_CLIENT_SERVER,
				methods: ['GET', 'POST']
			}
		})

		this._io.on('connection', () => {
			console.log('Conexão socket OK')
		})
	}

	private async _createMessageChannel() {
		try {
			const connection = await connect(process.env.AMQP_SERVER!)

			this._channel = await connection.createChannel()

			this._channel.assertQueue(process.env.QUEUE_NAME!)
		} catch(e) {
			console.log('Erro ao conectar com RabbitMQ')
			console.log(e)
		}
	}

	async consumeMessages() {
		await this._createMessageChannel()

		if(this._channel) {
			this._channel?.consume(process.env.QUEUE_NAME!, async msg => {
				const candle = JSON.parse(msg?.content.toString()!) as Candle

				console.log('Mensagem recebida', candle)

				this._channel?.ack(msg as ConsumeMessage)

				await this._candleCtrl.save(candle)
				
				console.log('Candle foi salva')

				this._io.emit(process.env.SOCKET_EVENT_NAME!, candle)

				console.log('Candle emitida para frontend')
			})

			console.log('Consumidor iniciado')
		}
	}
}