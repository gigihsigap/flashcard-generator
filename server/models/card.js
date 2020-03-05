'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model
  class Card extends Model { }

  Card.init({
    front: DataTypes.STRING,
    subFront: DataTypes.STRING,
    synFront: DataTypes.ARRAY(DataTypes.STRING),
    back: DataTypes.STRING,
    subBack: DataTypes.STRING,
    synBack: DataTypes.ARRAY(DataTypes.STRING),
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      }
    }
  }, { sequelize });

  Card.associate = function (models) {
    Card.belongsTo(models.User)
    // associations can be defined here
  };
  return Card;
};