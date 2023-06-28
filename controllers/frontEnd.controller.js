const db = require("../models/bundle.model");
const Op = db.Sequelize.Op;
const func = require("../libs/function");
const { v4: uuidv4 } = require("uuid");
const { where } = require("sequelize");

exports.getProdukHome = async (req, res) => {
  db.produk
    .findAll({
      attributes: ["id", "title", "image", "price", "url"],
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
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find Data >" + err,
      });
    });
};

exports.getProdukPage = async (req, res) => {
  let keyword = "";
  const condition = [];
  if (req.query.keyword) {
    keyword = req.query.keyword;
    condition.push({
      title: { [Op.like]: "%" + keyword + "%" },
    });
  }

  db.produk
    .findAll({
      where: condition,
      attributes: ["id", "title", "image", "price", "url"],
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
          message: `Tidak ada data yang cocok pada keyword '${keyword}'`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error find Data >" + err,
      });
    });
};

exports.getProdukDetil = async (req, res) => {
  const url = req.params.url;
  db.produk
    .findOne({
      where: { url: url },
      attributes: [
        "id",
        "title",
        "description",
        "full_description",
        "price",
        "image",
        "url",
        "createdAt",
      ],
      include: [
        {
          model: db.kategori,
          attributes: ["name"],
        },
      ],
    })
    .then((result) => {
      if (result) {
        res.send({
          code: 200,
          message: "OK",
          data: result,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "Produk telah dihapus!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: "Error retrive data",
      });
    });
};
