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
        },
        gameID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Players.associate = function(models){
        Players.belongsTo(models.Game,{
            foreignKey: {
                allowNull: false
            }
        });
        Players.hasMany(models.playerProperties,{
            onDelete: "cascade"
        });
    };

    return Players;
};