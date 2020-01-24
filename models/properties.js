module.exports = function(sequelize, DataTypes){
    var Properties = sequelize.define("Properties",{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hexadecimal: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Properties.associate = function(models){
        models.Properties.belongsToMany(models.playerProperties);
    }
}