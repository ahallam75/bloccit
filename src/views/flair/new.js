<!DOCTYPE html>
<html>
  <head>
    <% include ../static/partials/head.ejs %>
  </head>
  <body>
    <% include ../static/partials/navbar.ejs %>

    <main class="container">
      <h1>New Flair</h1>
      <form action="/topics/<%= topicId %>/posts/<%= postId %>/flairs/create" method="post">
        <div class="form-group">
          <label for="title">Flair Name</label>
          <input type="text" class="form-control" name="name" aria-describedby="titleHelp" placeholder="Enter Name">
        </div>
        <div class="form-group">
          <label for="body">Flair Color</label>
          <input type="text" class="form-control" name="color" placeholder="Enter Color">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </main>

    <% include ../static/partials/baseScripts.ejs %>

  </body>
</html>