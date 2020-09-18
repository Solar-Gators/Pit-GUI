let models = require("../../model");

router
  .route("/:id?")
  .get((req, res) => {
    if (req.params.id) {
      models.instance
        .findAll({
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
    } else {
      models.instance
        .findAll()
        .then((instance) => {
          res.json(instance);
        })
        .catch((err) => {
          res
            .status(400)
            .json({
              success: false,
              msg: "Get instances from database failed.",
            });
        });
    }
  })
  .post((req, res) => {
    const { type, name } = req.body;
    models.instance
      .create({
        type: type,
        name: name,
      })
      .then((instance) => {
        res.json(instance);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ success: false, msg: "Failed to add instance." });
      });
  })
  .delete((req, res) => {
    models.instance
      .destroy({
        name: `${req.params.id}`,
      })
      .then(() => {
        res.json({ success: true });
      })
      .catch((err) => {
        res
          .status(400)
          .json({ success: false, msg: "Failed to delete instance." });
      });
  });
