declare global {
	namespace NodeJS {
	  interface ProcessEnv {
		PRICES_API: string;
		QUEUE_NAME: string;
		AMQP_SERVER: string;
	  }
	}
  }