const { Sequelize } = require('sequelize');
const dbCOnfig = require("../config/config");

const sequelize = new Sequelize(
  dbCOnfig.DBNAME,
  dbCOnfig.USER,
  dbCOnfig.PASSWORD,
  {
    host: dbCOnfig.HOST,
    dialect: dbCOnfig.dialect,
    operatorAliases: false,
    port: dbCOnfig.DBPORT,
    pool: {
      max: dbCOnfig.pool.max,
      min: dbCOnfig.pool.min,
      acquire: dbCOnfig.pool.acquire,
      idle: dbCOnfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.produk = require("./produk.model")(sequelize, Sequelize);
db.kategori = require("./kategori.model")(sequelize, Sequelize);

db.kategori.hasMany(db.produk, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});
db.produk.belongsTo(db.kategori, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});

module.exports = db;
