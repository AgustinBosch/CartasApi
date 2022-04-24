module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        usuario_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre_usuario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rol_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'usuario',
        timestamps: true,
        createdAt: false,
        updatedAt: false,
        frezzeTableName: true,
        paranoid: true,
        deletedAt: 'borrado'
    });
    Usuario.associate = function (models) {
        Usuario.belongsTo(models.Rol, { foreignKey: 'rol_id' });
        Usuario.belongsToMany(models.Carta, { through: 'usuario_carta', foreignKey: 'usuario_id' });
    };
    return Usuario;
}