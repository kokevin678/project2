module.exports = function(sequelize, DataTypes){
    var playerProperties = sequelize.define("playerProperties",{
        numHouses:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            min: 0,
            max: 4
        },
        Hotel:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });

    playerProperties.associate = function(models){
        models.playerProperties.belongsTo(models.Properties);
    };

    return playerProperties;
}