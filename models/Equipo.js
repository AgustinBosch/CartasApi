module.exports = (sequelize, DataTypes) => {
    const Equipo = sequelize.define('Equipo', {
        equipo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'equipo',
        timestamps: false,
        frezzeTableName: true
    });

    Equipo.associate = function (models) {
        Equipo.hasMany(models.Carta, { foreignKey: 'equipo_id' });
    };

    return Equipo;
}