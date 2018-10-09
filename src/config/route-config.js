module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const postRoutes = require("../routes/posts");
      const topicRoutes = require("../routes/topics");
      const flairRoutes = require("../routes/flair");
      //const path = require ('path');


      app.use(staticRoutes);
      app.use(postRoutes);
      app.use(topicRoutes);
      //app.use(express.static(path.join(__dirname + '.../flair'))); 
      app.use(flairRoutes);

      
    }
  }