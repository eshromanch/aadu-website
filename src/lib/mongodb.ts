import mongoose from 'mongoose'

let cachedConnection: typeof mongoose | null = null
let cachedPromise: Promise<typeof mongoose> | null = null

async function dbConnect() {
	if (cachedConnection) {
		return cachedConnection
	}

	if (!cachedPromise) {
		const mongoUriFromEnv = process.env.MONGODB_URI
		if (!mongoUriFromEnv) {
			throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
		}

		const opts = {
			bufferCommands: false,
		}

		cachedPromise = mongoose.connect(mongoUriFromEnv, opts).then((mongooseInstance) => {
			return mongooseInstance
		})
	}

	try {
		cachedConnection = await cachedPromise
	} catch (error) {
		cachedPromise = null
		throw error
	}

	return cachedConnection
}

export default dbConnect 