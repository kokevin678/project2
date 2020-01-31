# MONOPOLY Tracker



## Summary 
Monopoly, the simple finance board game that brings friends and family together to bankrupt each other. The problem is that the game last too long. With MONOPOLY Tracker game can simply be paused and resume at ease. MONOPOLY Tracker allow players to
- Create multiple games
- Add players
- Log player location on the board when the game pause
- Log each player’s bought properties
- Number of houses and hotel on each property
- Current cash amount


## Site Demo
![Site](public/assets/img/demo.gif)

 
## Technologies Used
- HTML - Used to create elements on the DOM
- CSS - Styles html elements on page
- Bootstrap - CSS framework
- Youtube-dl - Download audio from YouTube
- Howler - Audio interaction
- Git - Version control system to track changes to source code
- GitHub - Hosts repository that can be deployed to GitHub Pages
- HeroKu - Plateform to deploy app on cloud


## Main Page
MONOPOLY Tracker can track many games
![site](public/img/landing.png)

## Add Game
Each game allows up to eight players
![site](public/img/player.png)

## Add Property
When the save page loads players can add the properties they own for that game
![site](public/img/properties.png)

## ADD house and hotel
Players can add houses and hotel to their property
![site](public/img/house.png)


 
## API POST Request
Querying the information from MySQL database to create new game
```js
    app.post("/api/games",function(req,res){
        db.Game.create({
            name: req.body.name,
            numPlayers: req.body.numPlayers
        }).then(function(result){
            res.json(result);
        })
        .catch(function(error){
            console.log(error);
        });
    });
```

Querying the information from mySQL database to create new player
```js
    app.post("/api/players",function(req,res){
        db.Players.create({
            name: req.body.name,
            token: req.body.token,
            money: req.body.money,
            position: req.body.position,
            GameId: req.body.GameId
        }).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });
```

Querying the information from MySQL database to create new player properties
```js
    app.post("/api/playerProperties",function(req,res){
        db.playerProperties.create({
            PlayerId: req.body.PlayerId,
            PropertyId: req.body.PropertyId
        }).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    })
```


## API response
AJAX call for player info
```js
    $.ajax({
        url: `/api/players/${gameData[index].id}`,
         type: "GET"
    }).then(function(playerData){
         console.log(playerData);
         var gameBlock = $("<div>").addClass("gameBlock");

        var gameName = $("<h1>");
        gameName.text(gameData[index].name);
```

AJAX call for games
```js
    $.ajax({
         url: "/api/games",
        type: "POST",
        data: newGame
    }).then(function(result){

        var playerArray = [
            {
                name: p1,
                token: "assets/img/mono_token_doggo.png",
                GameId: result.id
            },
            {
                name: p2,
                token: "assets/img/mono_token_tophat.png",
                GameId: result.id
            },
            {
                name: p3,
                token: "assets/img/mono_token_car.png",
                GameId: result.id
            },
            {
                name: p4,
                token: "assets/img/mono_token_battleship.png",
                GameId: result.id
            },
            {
                name: p5,
                token: "assets/img/mono_token_boot.png",
                GameId: result.id
            },
            {
                name: p6,
                token: "assets/img/mono_token_iron.png",
                GameId: result.id
            },
            {
                name: p7,
                token: "assets/img/mono_token_thimble.png",
                GameId: result.id
            },
            {
                name: p8,
                token: "assets/img/mono_token_wheelbarrow.png",
                GameId: result.id
            }
        ];
```

## New Technology
* [Howler.js](https://howlerjs.com/)
Howler.js is used on adding houses on property
```js
    $.ajax({
        type:"GET",
        url:`/api/playerProperties/property/${propertyId}`
    }).then(function(res){
        console.log(res)
        var sound = new Howl({
        src: ['assets/Sounds/hammer.mp4'],
        volume: 0.4
    });
```



## Built With
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Boostrap](https://www.bootstrapcdn.com/)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [Sequelize ORM](https://sequelize.org/)


## Authors

**Andres Felipe Jimenez** 
- [LinkedIn](https://www.linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192/)
- [Link to Github](https://github.com/AndresF97)

**Kevin Ko**
- [LinkedIn](https://www.linkedin.com/in/kevin-ko-ab7a98196/)
- [Link to Github](https://github.com/kokevin678)

**Michael Partin** 
- [LinkedIn](https://www.linkedin.com/in/michael-partin/)
- [Link to Github](https://github.com/rev1311)

**Yali Miranda** 
- [LinkedIn](https://www.linkedin.com/in/yal%C3%AD-miranda-8b4b94199/)
- [Link to Github](https://github.com/yjmiranda)


MONOPOLY Tracker Project
- [Link to Project](https://serene-badlands-41511.herokuapp.com/)
