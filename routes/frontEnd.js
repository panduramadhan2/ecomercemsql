const express = require("express");
const router = express.Router();
const frontEnd = require("../controllers/frontEnd.controller");

router.get("/produkHome", frontEnd.getProdukHome);
router.get("/produkPage", frontEnd.getProdukPage);
router.get("/produkDetil/:url", frontEnd.getProdukDetil);

//handle keranjang
router.get("/keranjang", frontEnd.getDataKeranjang);
router.post("/keranjang", frontEnd.tambahDataKeranjang);
router.put("/keranjang/:id", frontEnd.ubahDataKeranjang);
router.delete("/keranjang/:id", frontEnd.hapusDataKeranjang);

router.post("/checkout/:keranjang_id", frontEnd.checkout);

module.exports = router;
