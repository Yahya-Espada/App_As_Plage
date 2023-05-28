module.exports = (sequelize, DataTypes) => {
    const Plage = sequelize.define('plage', {
        id_plage: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nom_plage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description_plage: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        surface_plage: {
            type: DataTypes.GEOMETRY('POLYGON', 4326),
            allowNull: true
        }
    }, {
        tableName: 'plage',
        timestamps: false
    });
    return Plage;
};
