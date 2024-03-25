import 'dotenv/config'
import { connect } from 'mongoose'

export async function connectToMongoBD() {
	await connect(process.env.MONGODB_CONNECTION_URL as string)
}
