module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define("author",
    {
      // Giving the Author model a name of type STRING
      name: {
        type: DataTypes.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  Author.associate = (models) => {
    Author.hasMany(models.post, {
      onDelete: "cascade",
      foreignKey: {
        name: "author_id",
        allowNull: false
      }
    });
  };

  return Author;
};
