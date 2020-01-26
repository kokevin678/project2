module.exports = function(sequelize, DataTypes){
    var Game = sequelize.define("Game",{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len:[1]
        },
        numPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            min: 0,
            max: 8
        }
    });

    Game.associate = function(models){
        models.Game.hasMany(models.Players,{
            onDelete: "Cascade"
        });
    }

    return Game;
};