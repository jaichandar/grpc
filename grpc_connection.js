const grpc = require('@grpc/grpc-js')
const proto_loader = require('@grpc/proto-loader');
const PROTO_PATH = './products/proto/product.proto';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true,
}

const packageDefinition = proto_loader.loadSync(PROTO_PATH, options);
const ProductService = grpc.loadPackageDefinition(packageDefinition).ProductService;

const client = new ProductService('localhost:50051', grpc.credentials.createInsecure());

module.exports = { client }
