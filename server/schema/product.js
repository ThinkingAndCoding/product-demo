/* jshint indent: 2 */

export default function (sequelize, DataTypes) {
  return sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    description: {
      type: DataTypes.CHAR(255),
      allowNull: false
    },
    price: {
      type: DataTypes.CHAR(11),
      allowNull: false
    }
  }, {
    tableName: 'product'
  })
};
