module.exports = function(sequelize, DataTypes){
    var Properties = sequelize.define("Properties",{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hex: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Properties;
}