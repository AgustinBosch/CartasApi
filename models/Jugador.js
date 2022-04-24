module.exports = (sequelize, DataTypes) => {
    const Jugador = sequelize.define('Jugador', {
        jugador_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        foto: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'jugador',
        timestamps: false,
        frezzeTableName: true
    });

    Jugador.associate = function (models) {
        Jugador.hasMany(models.Carta, { foreignKey: 'jugador_id' });
    };

    return Jugador;
}