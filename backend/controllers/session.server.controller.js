/* Dependencies */
let sequelizeModels = require("../models");
let { session } = sequelizeModels;

/**
 * @breif Starts a sessions
 *
 * @param name name of the session to be started
 *
 * @return { Promise<{ id,  }> }
 */
exports.start = (req, res) => {
  if (session_running === true) {
    return res.json({
      success: false,
      msg: "There is already an ongoing session.",
    });
  }
  return session.create({
    name: req.body.name,
    start: new Date(),
    end: null,
  });
};

/**
 * @brief Ends a sessions
 *
 * @param id ID of session to end
 */
exports.end = (req, res) => {
  return session.update(
    {
      end: new Date(),
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );
};

/**
 * @brief Check to see if there is an active session
 * If there is an active session return its id an name
 * If there is not an acitve session return {session: false}
 */
exports.check = (req, res) => {
  return session.findOne(
    {
      where: {
        end: null
      }
    },
    (session) => {
      if (!session) {
        return res.json({ session: false });
      }
      return res.json({ session: true, id: session.id, name: session.name });
    }
  );
};
/**
 * @brief Basic get session or sessions from the database
 * @param id Optional id if there is an id return the session with that id
 *           If there is no id return a list of all the sessions
 */
exports.get = (req, res) => {
    if (req.params.id) {
        return session.findOne({
            where: {
                id: req.params.id
            }
        }).then((session) => {
            res.json(session);
        });
    } 
    return session.findAll()
    .then((session) => {
        res.json(session);
    })
    .catch((err) => {
        res.status(400).json({
            success: false,
            msg: "Get sessions from database failed.",
        });
    });
};
exports.delete = (req, res) => {
    session.destroy({
        where: {
            id: `${req.params.id}`
        }
    })
    .then(() => {
        res.json({ success: true });
    })
    .catch((err) => {
        res
        .status(400)
        .json({ success: false, msg: "Failed to delete session." });
    });
};
