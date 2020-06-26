var dataLink = require('./dataLink')
var network = require('./network')
var SerialPort = require('serialport')
var port = new SerialPort('/dev/ttyS3', { baudRate: 57600 })

port.on('data',function(data){
    // console.log("data")
    for (var index = 0; index < data.length; index++)
    {
        network.read(data[index])
    }
});
port.on('error', function(data)
{
    console.log('Error: ' + data)
});
