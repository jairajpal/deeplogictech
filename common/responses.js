
module.exports = () => (req, res, next) => {
    // success response
    res.success = (message, data) => {
        return res.send({ statusCode: 200, message, data: data || {} });
    };

    // error resposne
    res.error = (code, message, data) => {
        res.status(code).send({ statusCode: code, message, data: data || {} });
    };
    // proceed forward
    next();
};
