let models = require("../models");

exports.get = async (req, res) => {
  if (req.params.id) {
    return models.Car.findOne({
      where: {
        id: `${req.params.id}`,
      },
    })
      .then((car) => {
        res.json(car);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ success: false, msg: "Get car from database faild." });
      });
  }
  models.Car.findAll()
    .then((car) => {
      res.json(car);
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: "Get cars from database failed.",
      });
    });
};

exports.post = async (req, res) => {
  const { name, desc } = req.body;
  models.Car.create({
    name: name,
    desc: desc,
  })
    .then((car) => {
      res.json(car);
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "Failed to add car." });
    });
};
exports.delete = async (req, res) => {
  console.log(req.params.id);
  models.Car.destroy({
    where: {
      id: `${req.params.id}`,
    },
  })
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "Failed to delete car." });
    });
};
