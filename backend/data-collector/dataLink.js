
/**
* Special characters used for byte stuffing
*/
var specialChars = 
{
    start : 0xFF,
    end : 0x3F,
    escape : 0x2F
}

/**
* Current data transmission
*/
var data = []
var escaped = false
var inprogess = false

/**
* Reads a single byte, after a transmission is complete an array it returned in the calback
* 
* @param {Number} byteIn a single byte from a transmission
* @param {function} callback returns an array of a transmission
*/
function read(byteIn, callback)
{
    if (!escaped)
    {
        if (byteIn == specialChars.escape)
        {
            escaped = true
            return
        }

        else if (byteIn == specialChars.start)
        {
            if (inprogess)
            {
                console.error("Error: There was multiple start conditions")
                return
            }

            data = []
            inprogess = true
            return
        }

        else if (byteIn == specialChars.end)
        {
            if (!inprogess)
            {
                console.error("Error: There was an end condition without a start")
                return
            }

            //handle trasnmission
            inprogess = false
            callback(data)
            return
        }
    }

    else
    {
        escaped = false
    }
    
    if (!inprogess)
    {
        console.error("Error: There must be a start condition before a transmission can occour")
        return
    }

    data.push(byteIn)
}

exports.read = read
exports.specialChars = specialChars
