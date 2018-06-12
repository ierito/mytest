'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Session', {
      player_id : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      oli_id : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      field_id : {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      type : {
        type: DataTypes.ENUM('TRAINING', 'GAME'),
        allowNull: false
      }
  });

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
