'use strict';
module.exports = (sequelize, DataTypes) => {
  var customer = sequelize.define('customer', {
    name: {
        type : DataTypes.STRING,
        validate : {
            //doesn't allow empty string
            notEmpty : true
        }
    }
  }, {});
  customer.associate = function(models) {
    //establish association with burgers
    customer.hasMany(models.burger, {onDelete : "cascade"});
  };
  return customer;
};
