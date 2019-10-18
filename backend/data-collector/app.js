var SerialPort = require('serialport');

var port = new SerialPort('/dev/ttyS16', { baudRate: 2000000 });

port.on('data', function(data)
{
    // get buffered data and parse it to an utf-8 string
    data = data.toString('utf-8');
    console.log(data)
    // you could for example, send this data now to the the client via socket.io
});

port.on('error', function(data)
{
    console.log('Error: ' + data);
});
