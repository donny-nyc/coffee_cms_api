import mongoose from 'mongoose'

interface IProduct {
	name: string;
	description: string;
  categoryId: number;
	attributes: {};
};

interface ProductModelInterface extends mongoose.Model<Product> {
	build(attr: IProduct) : Product;
};

interface Product extends mongoose.Document {
	name: string;
	description: string;
  categoryId: number;
	attributes: {};
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
    type: Number,
    required: true
  },
	attributes: mongoose.Schema.Types.Mixed,
});

productSchema.statics.build = (attr: IProduct) => {
	return new Product(attr);
};

const Product = mongoose.model<Product, ProductModelInterface>('Product', productSchema, 'products');

export { Product };
