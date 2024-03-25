declare global {
	namespace NodeJS {
	  interface ProcessEnv {
		PORT: string;
		QUEUE_NAME: string;
		AMQP_SERVER: string;
		SOCKET_EVENT_NAME: string;
		SOCKET_CLIENT_SERVER: string;
		MONGODB_CONNECTION_URL: string;
	  }
	}
  }