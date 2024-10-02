const grpc = require('@grpc/grpc-js');
const proto_loader = require('@grpc/proto-loader')
const PROTO_PATH = './proto/product.proto';

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    default: true,
    oneofs: true,
}

const packageDefinition = proto_loader.loadSync(PROTO_PATH, options);
const ProductProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.addService(ProductProto.ProductService.service, {
    GetAllProducts: (_, callback) => {
        fetch('https://fakestoreapi.com/products', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                callback(null, { products: data });
            }).catch((err) => {
                throw new Error(err);
            })
    }
})

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        server.forceShutdown();
        console.log(error, "<-- error <--");
    } else {
        console.log(`Product Service Running on PORT: ${port}`);
    }
});