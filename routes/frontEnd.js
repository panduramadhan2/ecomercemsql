const express = require("express");
const router = express.Router();
const frontEnd = require("../controllers/frontEnd.controller");

router.get("/produkHome", frontEnd.getProdukHome);
router.get("/produkPage", frontEnd.getProdukPage);
router.get("/produkDetil/:url", frontEnd.getProdukDetil);

module.exports = router;
