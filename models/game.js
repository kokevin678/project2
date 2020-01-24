module.exports = function(sequelize, DataTypes){
    var Game = sequelize.define("Game",{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len:[1]
        }
    });

    Game.associate = function(models){
        models.Game.hasMany(models.Players,{
            onDelete: "cascade"
        });
    };

    return Game;
};