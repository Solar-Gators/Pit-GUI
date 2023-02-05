const udp = require('dgram')
const axios = require('axios')

const client = udp.createSocket('udp4')

client.on('message',function(msg,info){
    let data = {}
    try {
        data = JSON.parse(msg.toString())
    }
    catch {}

    if ("model" in data) {
        const {model, ...rest} = data
        axios.post("http://localhost:9000/api/" + data['model'], rest)
    }
});

client.bind(8000)
