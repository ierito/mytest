'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Oli', {
      serial_number : {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      status  : {
        type: DataTypes.ENUM('ENABLE', 'DISABLE'),
        defaultValue: 'ENABLE',
        allowNull: false
      }
  });

  Model.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };

  return Model;
};
