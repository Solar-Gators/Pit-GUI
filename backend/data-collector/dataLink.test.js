var dataLink = require('./dataLink')
var specialChars = dataLink.specialChars

function assertEqual(arr1, arr2)
{
    if (arr1.length != arr2.length)
        return console.trace("ERROR ARRAYS NOT EQUAL")
    
    for (var index = 0; index < arr1.length; index++)
    {
        if (arr1[index] != arr2[index])
            return console.trace("ERROR ARRAYS NOT EQUAL")
    }
}

function sendData(dataIn, callback)
{
    var data = [specialChars.start]
    for (var index = 0; index < dataIn.length; index++)
    {
        var dataByte = dataIn[index]
        if (dataByte == specialChars.start || dataByte == specialChars.end || dataByte == specialChars.escape)
            data.push(specialChars.escape)
        
        data.push(dataByte)
    }

    data.push(specialChars.end)

    for (var index = 0; index < data.length; index++)
        dataLink.read(data[index], callback)
}

var example1 = [1,2,3,4,5,6,7]
var example2 = [1,2,3,4, specialChars.start, 5,6,7]
var example3 = [1,2,3,4, specialChars.end, 5,6,7]
var example4 = [1,2,3,4, specialChars.escape, 5,6,7]

sendData(example1, (data) =>
{
    assertEqual(example1, data)
})

sendData(example2, (data) =>
{
    assertEqual(example2, data)
})

sendData(example3, (data) =>
{
    assertEqual(example3, data)
})

sendData(example4, (data) =>
{
    assertEqual(example4, data)
})
