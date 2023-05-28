//Locataire model
module.exports = (sequelize, DataTypes) => {
    const Locataire = sequelize.define('locataire', {
        id_locataire: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email_locataire: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_locataire: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nom_locataire: {
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom_locataire: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cin_locataire: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        adresse_locataire: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephone_locataire: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        etat_locataire: {
            type: DataTypes.STRING,
            default: false
        }
    }, {
        tableName: 'locataire',
        timestamps: false,
    });
    return Locataire
}