module.exports = (sequelize, DataTypes) => {
    const Carta = sequelize.define('Carta', {
        carta_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        jugador_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        posicion_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        serie_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rareza_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        equipo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'carta',
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        frezzeTableName: true,
        paranoid: true,
        deletedAt: 'borrado'
    });

    Carta.associate = function (models) {
        Carta.belongsTo(models.Jugador, { foreignKey: 'jugador_id' });
        Carta.belongsTo(models.Posicion, { foreignKey: 'posicion_id' });
        Carta.belongsTo(models.Serie, { foreignKey: 'serie_id' });
        Carta.belongsTo(models.Rareza, { foreignKey: 'rareza_id' });
        Carta.belongsTo(models.Equipo, { foreignKey: 'equipo_id' });
        Carta.belongsToMany(models.Coleccion, { through: 'carta_coleccion', foreignKey: 'carta_id' });
        Carta.belongsToMany(models.Usuario, { through: 'usuario_carta', foreignKey: 'carta_id' });
    };

    return Carta;
}