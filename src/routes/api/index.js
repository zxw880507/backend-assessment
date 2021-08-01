const router = require("express").Router();

router.use("/ping", require("./ping"));
router.use("/posts", require("./posts"));

module.exports = router;
