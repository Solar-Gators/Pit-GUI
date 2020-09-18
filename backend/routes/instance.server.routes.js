let models = require("../../model");

router
  .route("/:id?")
  .get((req, res) => {
    models.instance
      .findAll()
      .then((instance) => {
        res.json(instance);
      })
      .catch((err) => {
        res
          .status(400)
          .json({ success: false, msg: "Get instances from database." });
      });
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
        name: `${id}`,
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
