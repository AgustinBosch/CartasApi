module.exports = (sequelize, DataTypes) => {
    const Serie = sequelize.define('Serie', {
        serie_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_emision: {
            type: DataTypes.DATE,
            allowNull: false
        },
    }, {
        tableName: 'serie',
        timestamps: false,
        frezzeTableName: true
    });

    Serie.associate = function (models) {
        Serie.hasMany(models.Carta, { foreignKey: 'serie_id' });
    };

    return Serie;
}