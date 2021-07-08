import Sequelize from 'sequelize';
const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
});

export {
    Sequelize,
    sequelize,
}