require('dotenv').config()
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
        const API_USERNAME = process.env?.["API_USERNAME"] ?? ""
        const API_PASSWORD = process.env?.["API_PASSWORD"] ?? ""
        axios.post(
            "http://localhost:9000/api/" + data['model'],
            rest,
            {
                headers: {
                    "username": API_USERNAME,
                    "password": API_PASSWORD,
                }
            }
        )
    }
});

client.bind(8000)
