module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: "Personal"
      }
    },
    {
      freezeTableName: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  Post.associate = (models) => {
    Post.belongsTo(models.author, {
      foreignKey: {
        name: "author_id",
        allowNull: false
      }
    });
  };

  return Post;
};
