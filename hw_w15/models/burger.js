'use strict';
module.exports = (sequelize, DataTypes) => {
  var burger = sequelize.define('burger', {
    burger_name: {
        type : DataTypes.STRING,
        validate : {
            //doesn't allow empty string or null val
            notNull : true,
            notEmpty : true
        }
    }
    devoured: {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    }
    //foreign key
    customer_id: DataTypes.INTEGER,

  }, {});
  burger.associate = function(models) {
      //set up association to customer
      burger.belongsTo(models.customer, { foreign_key : customer_id });
  };
  return burger;
};
