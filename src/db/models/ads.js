/*'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ads = sequelize.define('Ads', {
    source: DataTypes.STRING,
    description: DataTypes.STRING,
     topicId: {
       type: DataTypes.INTEGER,
       onDelete: "CASCADE",
       references: {
         model: "Topic",
         key: "id",
         as: "topicId",
       }
     }
  }, {});
  Ads.associate = function(models) {
    // associations can be defined here
    Ads.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
  };
  return Ads;
};*/

'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ads = sequelize.define('Ads', {
    title: DataTypes.STRING, 
    description: DataTypes.STRING
  }, {});
  Ads.associate = function(models) {
    // associations can be defined here
  };
  return Ads;
};