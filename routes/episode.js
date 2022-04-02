import express from 'express'

const router = express.Router();

router.get('/:number', (req, res) => {
    res.send(`Number : ${req.params.number}`);
});

export default router;