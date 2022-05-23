import express, { Request, Response } from 'express';
import { Coffee } from '../../models/coffee';

const router = express.Router();

router.get('/api/coffee', [],  async (req: Request, res: Response) => {
	try {
		const coffee = await Coffee.find({})
		return res.status(200).send(coffee);
	} catch (err: any) {
		return res.status(500).send({
		message: err.message
		});
	}
});

router.post('/api/coffee', [], async (req: Request, res: Response) => {
	const { name, origin } = req.body;

	const coffee = Coffee.build({
		name,
		origin,
		quantity: 0,
		price: 0,
		date_roasted: new Date(),
		description: ''
	});

	await coffee.save();

	return res.status(201).send(coffee);
});

export { router as coffeeRouter }
