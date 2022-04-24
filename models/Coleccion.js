module.exports = (sequelize, DataTypes) => {
    const Coleccion = sequelize.define('Coleccion', {
        coleccion_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        serie_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'coleccion',
        timestamps: false,
        frezzeTableName: true
    });

    Coleccion.associate = function (models) {
        Coleccion.belongsTo(models.Serie, { foreignKey: 'serie_id' });
        Coleccion.belongsToMany(models.Carta, { through: 'carta_coleccion', foreignKey: 'coleccion_id' });
    };

    return Coleccion;
}