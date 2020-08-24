module.exports = {
    db: {
        uri: 'mongodb://solargators:oyawhkmDlRSkUriU@tokyo-shard-00-00-uyvve.mongodb.net:27017,tokyo-shard-00-01-uyvve.mongodb.net:27017,tokyo-shard-00-02-uyvve.mongodb.net:27017/<dbname>?ssl=true&replicaSet=Tokyo-shard-0&authSource=admin&retryWrites=true&w=majority',

        //uri: 'mongodb+srv://solargators:oyawhkmDlRSkUriU@tokyo-uyvve.mongodb.net/SolarGators?retryWrites=true&w=majority'
    },
    port: 8080
};
