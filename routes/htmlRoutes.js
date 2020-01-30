module.exports = function(app, path) {
  // send default page to all routes that are undefined
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public"));
  });

  //game route loads game.html
  app.get("/game", function(req, res) {
    res.sendfile(path.join(__dirname, "../public/save.html"));
  });

  //player routeloads player.html
  app.get("/player", function(req, res) {
    res.sendFile(path.join(__dirname, "../public"));
  });
};
