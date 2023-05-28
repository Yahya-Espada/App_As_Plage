//Citoyen model
module.exports = (sequelize, DataTypes) => {
  const Citoyen = sequelize.define('citoyen', {
    id_citoyen: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email_citoyen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_citoyen: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'citoyen',
    timestamps: false,
  });
  return Citoyen
}