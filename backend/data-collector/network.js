var dataLink = require('./dataLink')


//num messages, address, data len, data

function handleTransmission(data)
{
    var numMessages = data[0]
    var len = data.length
    var currentIndex = 0
    var currentTransmission = 0

    for (var index = 1; index < len; index++)
    {
        var dataItem = data[index]
        if (currentIndex == 0)
        {
            //address
        }

        else if (currentIndex == 1)
        {
            //data len

        }

        else
        {
            //data
        }

    }


}

function read(byteIn)
{
    dataLink.read(handleTransmission)
}
