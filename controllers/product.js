const { client } = require('../grpc_connection');

const getAllProducts = (req, res, next) => {
    try {
        client.GetAllProducts(null, (err, data) => {
            if (err) {
                throw new Error(err)
            } else {
                return res.status(200).json({
                    success: true,
                    data,
                })
            }
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = { getAllProducts };