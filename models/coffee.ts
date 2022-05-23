import mongoose from 'mongoose'

interface ICoffee {
	name: string;
	origin: string;
	quantity: number;
	price: number;
	date_roasted: Date;
	description: string;
};

interface CoffeeModelInterface extends mongoose.Model<Coffee> {
	build(attr: ICoffee) : Coffee;
};

interface Coffee extends mongoose.Document {
	name: string;
	origin: string;
	quantity: number;
	price: number;
	date_roasted: Date;
	description: string;
};

const coffeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	origin: {
		type: String,
		required: true
	},
});

coffeeSchema.statics.build = (attr: ICoffee) => {
	return new Coffee(attr);
};

const Coffee = mongoose.model<Coffee, CoffeeModelInterface>('Coffee', coffeeSchema, 'coffees');

export { Coffee };
