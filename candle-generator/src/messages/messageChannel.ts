import 'dotenv/config'
import { Channel, connect } from 'amqplib'

export async function createMessageChannel(): Promise<Channel|null> {
	try {
		const connection = await connect(process.env.AMQP_SERVER!)
		const channel = await connection.createChannel()
		
		await channel.assertQueue(process.env.QUEUE_NAME!)
		
		console.log('Connected to RabbitMQ')

		return channel
	} catch(e) {
		console.log('Error while trying to connect to RabbitMQ.')
		console.log(e)

		return null
	}
}