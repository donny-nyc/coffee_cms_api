import mongoose from 'mongoose';

interface ICategory {
  name: string;
  description: string;
};

interface CategoryModelInterface extends mongoose.Model<Category> {
  build(attr: ICategory) : Category;
};

interface Category extends mongoose.Document {
  name: string;
  description: string;
};

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
});

categorySchema.statics.build = (attr: ICategory) => {
  return new Category(attr);
};

const Category = mongoose.model<Category, CategoryModelInterface>('Category', categorySchema, 'product_categories');

export { Category };
