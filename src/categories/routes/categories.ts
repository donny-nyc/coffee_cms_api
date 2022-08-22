import express, { Request, Response } from 'express';
import { Category } from '../models';

const router = express.Router();

router.options('/categories')

router.get('/', async(req: Request, res: Response) => {
  // let ids: string = req.query.ids;

  try {
    let totalCategories = 0;

    Category.countDocuments({}, function(_: any, count: number) {
      totalCategories = count;
    });

    const categories: Category[] = await Category.find({});

    return res.status(200).json({
      total: totalCategories,
      categories
    });
  } catch(err: any) {
    return res.status(500).send({
      error: err.message
    });
  }
});

export { router as categoryRouter }
