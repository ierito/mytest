'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Field', {
      data_points : {
        type: DataTypes.STRING(45),
        allowNull: false
      }
  });

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
