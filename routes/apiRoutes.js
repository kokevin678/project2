var db = require("../models");

module.exports = function(app){

// ------------------------------------------------------
// -------------------- GET REQUESTS --------------------
// ------------------------------------------------------

    //returns all the properties
    app.get("/api/properties", function(req,res){
        db.Properties.findAll({})
            .then(function(result){
                res.json(result);
            })
            .catch(function(error){
                console.log(error);
            });
    });

    //returns all the games that currently exist
    app.get("/api/games", function(req,res){
        db.Game.findAll({})
            .then(function(result){
                res.json(result);
            })
            .catch(function(error){
                console.log(error);
            });
    });

    //returns all the players belonging to a specific game
    app.get("/api/players/:GameId", function(req,res){
        db.Players.findAll({
            where:{
                GameId: req.params.GameId
            }
        }).then(function(result){
            res.json(result);
        })
        .catch(function(error){
            console.log(error);
        });
    });

    //returns all the properties belonging to a specific player
    app.get("/api/playerProperties/:PlayerId", function(req,res){
        db.playerProperties.findAll({
            where:{
                PlayerId: req.params.PlayerId
            },
            include:{
                model: db.Properties,
                attributes: ["name","hex"]
            }
        }).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });

    app.get("/api/playerProperties/property/:propertyId",function(req,res){
        db.playerProperties.findAll({
            where:{
                id: req.params.propertyId
            },
            include:{
                model:db.Properties,
                attributes: ["name","hex"]
            }
        }).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });

// -------------------------------------------------------
// -------------------- POST REQUESTS --------------------
// -------------------------------------------------------

    //used to create a new game
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

    //used to create a new player
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

    //used to create a new playerProperty
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

// ------------------------------------------------------
// -------------------- PUT REQUESTS --------------------
// ------------------------------------------------------

    // used to update a game's name
    app.put("/api/games/:id", function(req,res){
        db.Game.update(
            {
                name: req.body.name,
                numPlayers: req.body.numPlayers
            },
            {
                where:{
                    id: req.params.id
                }
            }
        ).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });
    
    // used to update a player's money
    app.put("/api/players/:id", function(req,res){
        db.Players.update(
            {
                money: req.body.money,
                position: req.body.position
            },
            {
                where:{
                    id: req.params.id
                }
            }
        ).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });

    app.put("/api/playerProperties/:id",function(req,res){
        db.playerProperties.update(
            {
                numHouses: req.body.numHouses,
                Hotel: req.body.Hotel
            },
            {
                where:{
                    id: req.params.id
                }
            }
        ).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    })

// ---------------------------------------------------------
// -------------------- DELETE REQUESTS --------------------
// ---------------------------------------------------------

    //used to delete a specific game
    app.delete("/api/games/:id",function(req,res){
        db.Game.destroy({
            where:{
                id: req.params.id
            }
        }).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });

    //used to delete a specific player
    app.delete("/api/players/:id",function(req,res){
        db.Players.destroy({
            where:{
                id: req.params.id
            }
        }).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });

    //used to delete a specific playerProperty
    app.delete("/api/playerProperties/:id",function(req,res){
        db.playerProperties.destroy({
            where:{
                id: req.params.id
            }
        }).then(function(result){
            res.json(result);
        }).catch(function(error){
            console.log(error);
        });
    });

// ----------------------------------------------------
// -------------------- DEV ROUTES --------------------
// ----------------------------------------------------

    //These routes are for dev use only
    //Not used in app

    //used to quickly populate the properties table
    app.post("/api/dev/properties",function(req,res){
        for(let i = 0; i < req.body.length; i++){
            db.Properties.create(req.body[i])
                .catch(function(error){
                    console.log(error);
                });
        }
    });

    //used to quickly popuplate games table
    app.post("/api/dev/games",function(req,res){
        for(let i = 0; i < req.body.length; i++){
            db.Game.create(req.body[i])
                .catch(function(error){
                    console.log(error);
                });
        }
    });

    //used to quickly populate players table
    app.post("/api/dev/players",function(req,res){
        let tracker = {};
        for(let i = 0; i < req.body.length; i++){
            if(tracker[req.body[i].GameId]){
                tracker[req.body[i].GameId]++;
            } else{
                tracker[req.body[i].GameId] = 1;
            }
            db.Players.create(req.body[i])
                .catch(function(error){
                    console.log(error);
                });
        }

        //updates the number of players in each game
        for(var key in tracker){
            db.Game.update(
                {
                    numPlayers: tracker[key]
                },
                {
                    where:{
                        id: key
                    }
                }                
            )
        }

        // console.log(tracker);
    });

    //used to quickly populate playerProperties table
    app.post("/api/dev/playerProperties",function(req,res){
        for(let i = 0; i < req.body.length; i++){
            db.playerProperties.create(req.body[i])
                .catch(function(error){
                    console.log(error);
                });
        }
    });

};
