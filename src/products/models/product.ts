import mongoose from 'mongoose';

interface IProduct {
	name: string;
	description: string;
  categoryId: string;
  attributes: {name: string, value: any}[]
};

interface ProductModelInterface extends mongoose.Model<Product> {
	build(attr: IProduct) : Product;
};

interface Product extends mongoose.Document {
	name: string;
	description: string;
  categoryId: string;
  attributes: {name: string, value: any}[];
};

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
  categoryId: {
    type: String,
    required: true
  },
	attributes: mongoose.Schema.Types.Mixed,
});

productSchema.statics.build = (attr: IProduct) => {
	return new Product(attr);
};

const Product = mongoose.model<Product, ProductModelInterface>('Product', productSchema, 'products');

export { Product };
