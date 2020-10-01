let models = require("../models");

exports.get = async (req, res) => {
  if (req.params.id) {
    return models.Instance.findOne({
      where: {
        name: `${req.params.id}`,
      },
    })
      .then((instance) => {
        res.json(instance);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ success: false, msg: "Get instance from database faild." });
      });
  }
  models.Instance.findAll()
    .then((instance) => {
      res.json(instance);
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: "Get instances from database failed.",
      });
    });
};

exports.post = async (req, res) => {
  const { name, type } = req.body;
  models.Instance.create({
    type: type,
    name: name,
  })
    .then((instance) => {
      res.json(instance);
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "Failed to add instance." });
    });
};

exports.delete = async (req, res) => {
  return models.Instance.destroy({
    where: {
      name: `${req.params.id}`,
    },
  })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "Failed to delete instance." });
    });
};
