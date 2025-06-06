const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch(e) {
        res.status(400).send({ error: e.errors})
    }
}

export { validate }