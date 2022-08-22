import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import expressWinston from 'express-winston'
import winston from 'winston'
import { json } from 'body-parser';
import { productRouter } from './products/routes/products'
import { categoryRouter } from './categories/routes/categories'

const app = express();

app.use(cors());

app.use(expressWinston.logger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	)
}));

app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);

app.use(expressWinston.errorLogger({
	transports: [
		new winston.transports.Console()
	],
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.json()
	)
}));

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect('mongodb://test:pass@mongo:27017/products', options).then(() => {
	// tslint:disable-next-line:no-console
	console.log("connected to mongo");
}).catch((error: any) => {
	// tslint:disable-next-line:no-console
	console.error(error.message);
});

const PORT = 3000;

app.listen(PORT, () => {
	// tslint:disable-next-line:no-console
	console.log(`Express listening on ${PORT}`);
});
