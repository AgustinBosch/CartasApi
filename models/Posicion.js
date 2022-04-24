module.exports = (sequelize, DataTypes) => {
    const Posicion = sequelize.define('Posicion', {
        posicion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'posicion',
        timestamps: false,
        frezzeTableName: true
    });

    Posicion.associate = function (models) {
        Posicion.hasMany(models.Carta, { foreignKey: 'posicion_id' });
    };

    return Posicion;
}