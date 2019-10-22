import dataLink from './dataLink'
var SerialPort = require('serialport')
var port = new SerialPort('/dev/ttyS16', { baudRate: 2000000 })

port.on('data', dataLink.read);
port.on('error', function(data)
{
    console.log('Error: ' + data)
});
