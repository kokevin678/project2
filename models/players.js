module.exports = function(sequelize, DataTypes){
    var Players = sequelize.define("Players",{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len:[1]
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        money: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1500
        }
    });

    Players.associate = function(models){
        
        models.Players.hasMany(models.playerProperties,{
            onDelete: "cascade"
        });
    }

    return Players;
};