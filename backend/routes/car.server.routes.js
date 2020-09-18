let models = require("../../model");

router
  .route("/:id?")
  .get((req, res) => {
    if (req.params.id) {
      models.car
        .findAll({
          where: {
            name: `${req.params.id}`,
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
    } else {
      models.car
        .findAll()
        .then((car) => {
          res.json(car);
        })
        .catch((err) => {
          res.status(400).json({
            success: false,
            msg: "Get cars from database failed.",
          });
        });
    }
  })
  .post((req, res) => {
    const { name, desc } = req.body;
    models.car
      .create({
        name: name,
        description: description,
      })
      .then((car) => {
        res.json(car);
      })
      .catch((err) => {
        res.status(400).json({ success: false, msg: "Failed to add car." });
      });
  })
  .delete((req, res) => {
    models.car
      .destroy({
        name: `${id}`,
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res.status(400).json({ success: false, msg: "Failed to delete car." });
      });
  });
