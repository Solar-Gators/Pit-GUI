/* Dependencies */
let sequelizeModels = require('../models')
let { Session } = sequelizeModels

/**
* Starts a sessions
* 
* @param name name of the session to be started
* 
* @return { Promise<{ id,  }> }
*/
exports.start = (req, res) => {
    return Session.create({
        name: req.body.name,
        start: new Date(),
        end: null
    })
}

/**
* Ends a sessions
* 
* @param id ID of session to end
*/
exports.end = (req, res) => {
    return Session.update({
        end: new Date()
    }, {
        where: {
            id: req.body.id
        }
    })
}

/**
 * Check to see if there is an active session
 * 
 * 
 */
exports.check = (req, res) => {
    return Session.findOne({
        where: {
            end: null
        }
    }, () => {

    })
}
