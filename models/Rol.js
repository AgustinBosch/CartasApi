module.exports = (sequelize, DataTypes) => {
    const Rol = sequelize.define('Rol', {
        rol_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'rol',
        timestamps: false,
        frezzeTableName: true
    });

    Rol.associate = function (models) {
        Rol.hasMany(models.Usuario, { foreignKey: 'rol_id' });
    };

    return Rol;
}
