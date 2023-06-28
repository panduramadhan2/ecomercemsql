const db = require("../models/bundle.model");
const Op = db.Sequelize.Op;
const func = require("../libs/function");
const { v4: uuidv4 } = require("uuid");

exports.getProdukHome = async (req, res) => {
  db.produk
    .findAll({
      limit: 8,
    })
    .then((result) => {
      if (result.length > 0) {
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Data tidak tersedia",
        });
      }
    })
    .cacth((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find Data >" + err,
      });
    });
};
