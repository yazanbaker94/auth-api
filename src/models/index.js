'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const clothesModel = require('./clothes/model.js');
const foodModel = require('./food/model.js');
const Collection = require('./data-collection.js');
const userModel = require('./users.js');



const DATABASE_URL = process.env.DATABASE_URL || "postgres://uytoiujwtcdayz:b5f5fbdd6d371b7e487a7419ee678f60fce994a09456922b991ba96fc563e461@ec2-34-251-245-108.eu-west-1.compute.amazonaws.com:5432/d9flft0hi75uuc" ;

let sequelizeOptions = {
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  clothes: new Collection(clothes),
  users: userModel(sequelize, DataTypes),
};
