const Sequelize = require('sequelize');
const sequelizeConnection = Sequelize('taxibattle', 'taxibattleadmin', '$ecure2017', {
  host: 'jdbc:postgresql://taxi-battle.c6fuxqzbygvo.us-east-1.rds.amazonaws.com:5432/taxibattle',
  dialect: 'postgres'
  });

sequelize.authenticate()
  .then((err) => console.log('Connection has been established successfully.'))
  .catch((err) => console.log('Unable to connect to the database:', err));

module.exports = sequelizeConnection;