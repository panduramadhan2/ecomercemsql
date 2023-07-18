const { Sequelize } = require("sequelize");
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
db.transaksi = require("./transaksi.model")(sequelize, Sequelize);
db.transaksi_detil = require("./transaksi_detil.model")(sequelize, Sequelize);
db.customer = require("./customer.model")(sequelize, Sequelize);
db.keranjang = require("./keranjang.model")(sequelize, Sequelize);

db.kategori.hasMany(db.produk, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});
db.produk.belongsTo(db.kategori, {
  foreignKey: "category_id",
  onDelete: "SET NULL",
});

db.produk.hasMany(db.keranjang, {
  foreignKey: "produk_id",
  onDelete: "CASCADE",
});
db.keranjang.belongsTo(db.produk, { foreignKey: "produk_id" });

db.produk.hasMany(db.transaksi_detil, {
  foreignKey: "produk_id",
  onDelete: "SET NULL",
});
db.transaksi_detil.belongsTo(db.produk, { foreignKey: "produk_id" });

db.transaksi.hasMany(db.transaksi_detil, { foreignKey: "trs_id" });
db.transaksi_detil.belongsTo(db.transaksi, { foreignKey: "trs_id" });

db.transaksi.hasOne(db.customer, { foreignKey: "trs_id", onDelete: "CASCADE" });
db.customer.belongsTo(db.transaksi, { foreignKey: "trs_id" });

module.exports = db;
