module.exports = function(sequelize, DataTypes){
    var playerProperties = sequelize.define("playerProperties",{
        playerID: DataTypes.INTEGER,
        propertyID = DataTypes.INTEGER
    });

    playerProperties.associate = function(models){
        playerProperties.belongsTo(models.Players);
        playerProperties.hasMany(models.Properties);
    };
}