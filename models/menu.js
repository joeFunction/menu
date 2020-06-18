module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "menu",
    {
      TableNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      foodOrder: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      drinkOrder: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
    }
  );

  Menu.associate = (models) => {
    Menu.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Menu;
};
