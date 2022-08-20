import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import bodyParser from 'body-parser'

const router = express.Router();

const jsonParser = bodyParser.json();

router.options('/products') // enable pre-flight options for POST

router.get('/', [],  async (_: Request, res: Response) => {
	try {
		const products: Product[] = await Product.find({})
		return res.status(200).send(products);
	} catch (err: any) {
		return res.status(500).send({
		message: err.message
		});
	}
});

router.get('/:id', async(req: Request, res: Response) => {
  let id: string = req.params.id;

  try {
    const product: Product | null = await Product.findById(id);

    if(product) {
      return res.status(200).send(product);
    } else {
     return res.status(404).send({"message": "Not Found"});
    }
  } catch(err: any) {
    console.error(err);
    return res.status(500).send(err);
  }
});

router.post('/', jsonParser, async (req: Request, res: Response) => {
	const { name, description, categoryId, attributes } = req.body;

	try {
		const product = Product.build({
			name,
			description,
      categoryId,
			attributes,
		});

		await product.save();

		return res.status(201).send(product);
	} catch (err: any) {
		if(err.name === 'ValidationError') {
			let errors : Record<string, string> = {};

			Object.keys(err.errors).forEach((key) => {
				errors[key] = err.errors[key].message;
			});

			return res.status(400).send(errors);
		}

		res.status(500).send("Unable to create record");
	}
});

router.put('/:id', jsonParser, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, categoryId, attributes } = req.body;

  console.log('update req:', req.body);

  try {
    const product = await Product.findById(id);

    if(!product) {
      return res.status(404).send({
        error: `Product ${id} not found`
      });
    }

    product.name = name;
    product.description = description;
    product.categoryId = categoryId;
    product.attributes = attributes;

    await product.save();

    return res.status(200).send(product);
  } catch (err: any) {
    if(err.name === 'ValidationError') {
      let errors: Record<string, string> = {};

      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });

      return res.status(400).send(errors);
    }

    console.log('unhandled error:', err);

    res.status(500).json({
      message: `Unable to update product - ${id}`,
      error: err
    });
  }
});

router.delete('/remove_all', async (_: Request, res: Response) => {
  Product.deleteMany({}, (err: any, result: any) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({
        error: err.message
      });
    }

    res.status(200).json({
      message: result
    });
  });
});

router.delete('/:ids', jsonParser, async (req: Request, res: Response) => {
  Product.deleteMany({
    _id: {
      $in: req.params.ids.split(',')
    }
  }, (err: any, result: any) => {
    if(err) {
      return res.status(500).json({
        error: err
      });
    }

    res.status(200).json({
      message: result
    });
  });
});

export { router as productRouter }
