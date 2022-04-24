module.exports = (sequelize, DataTypes) => {
    const Rareza = sequelize.define('Rareza', {
        rareza_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'rareza',
        timestamps: false,
        frezzeTableName: true
    });

    Rareza.associate = function (models) {
        Rareza.hasMany(models.Carta, { foreignKey: 'rareza_id' });
    };

    return Rareza;
}