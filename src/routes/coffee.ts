import express, { Request, Response } from 'express';
import { Coffee } from '../../models/coffee';
import bodyParser from 'body-parser'

const router = express.Router();

const jsonParser = bodyParser.json();

router.options('/api/coffee') // enable pre-flight options for POST

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

router.post('/api/coffee', jsonParser, async (req: Request, res: Response) => {
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

router.delete('/api/coffee/:id', jsonParser, async (req: Request, res: Response) => {
	Coffee.findByIdAndRemove(req.params.id)
	.then(coffee => {
		if(!coffee) {
			return res.status(404).send({
				message: `Record ${req.params.id} not found`
			})
		}
		res.send({message: "Record deleted"})
	}).catch(err => {
		if(err.kind === 'ObjectId' || err.name === 'NotFound') {
			return res.status(404).send({
				message: `Record ${req.params.id} not found`
			})
		}

		return res.status(500).send({
			message: `Unable to delete record ${req.params.id}`
		})
	})
});

export { router as coffeeRouter }
