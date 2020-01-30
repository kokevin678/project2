$(document).ready(function() {

    var gameList = $("#gameList");

    renderGameList();

    function renderGameList(){
        gameList.empty();
        $.ajax({
            url: "/api/games",
            type: "GET"
        }).then(function(gameData){
            console.log(gameData);
            renderGameData(gameData, gameData.length, 0);
        });
    }

    function renderGameData(gameData, numGames, index){
        if(index < numGames){
            $.ajax({
                url: `/api/players/${gameData[index].id}`,
                type: "GET"
            }).then(function(playerData){
                console.log(playerData);
                var gameBlock = $("<div>").addClass("gameBlock");

                var gameName = $("<h1>");
                gameName.text(gameData[index].name);

                var ul = $("<ul>");

                var startButton = $("<a>");
                startButton.addClass("startBtn btn");
                startButton.attr('data-gameid',`${gameData[index].id}`);
                startButton.attr('href', "/game");
                startButton.text("Start");

                var deleteButton = $("<button>");
                deleteButton.addClass("deleteBtn ml-3");
                deleteButton.attr('data-gameid', `${gameData[index].id}`);
                deleteButton.text("Delete");

                for(let j = 0; j < playerData.length; j++){
                    var li = $("<li>");
                    var h3 = $("<h3>");
                    h3.css("color","#eb0000");
                    h3.text(playerData[j].name);
                    li.append(h3);
                    ul.append(li);
                }

                gameBlock.append(gameName);
                gameBlock.append(ul);
                gameBlock.append(startButton);
                gameBlock.append(deleteButton);
                gameList.append(gameBlock);
                renderGameData(gameData,numGames,index+1);
            });
        }
    }

    gameList.on("click", ".startBtn",function(event){
        var gameID = $(this).data("gameid");
        localStorage.setItem("currentGame", gameID);
    });

    gameList.on("click", ".deleteBtn", function(event){
        var gameID = $(this).data("gameid");
        var confirmDelete = confirm("Are you sure you want to delete this game?");
        if(confirmDelete === true){
            $.ajax({
                url: `/api/games/${gameID}`,
                type: "DELETE",
            }).then(function(){
                renderGameList();
            });
        }
    });

    var sound = new Howl({
        src: ['assets/Sounds/cash.mp4']
    });

    $("#newBtn").on("click", function() {
        $(".bg-modal").css("display", "flex");
        sound.play();
        console.log('clicked');
    });

    $("#createGameBtn").on("click", function(e) {
        event.preventDefault();
        $(".bg-modal").css("display", "none");
        var title = $("#gameTitle").val();
        var p1 = $("#player1").val();
        var p2 = $("#player2").val();
        var p3 = $("#player3").val();
        var p4 = $("#player4").val();
        var p5 = $("#player5").val();
        var p6 = $("#player6").val();
        var p7 = $("#player7").val();
        var p8 = $("#player8").val();

        if(title !== ""){
            var newGame = {
                name: title
            }
        } else {
            alert("You must enter a game name.");
            return;
        }

        if(p1 === "" && p2 === "" && p3 === "" && p4 === "" && p5 === "" && p6 === "" && p7 === "" && p8 === ""){
            alert("You must enter at least one player.");
            return;
        }

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

            for(let i = 0; i < playerArray.length; i++){

                if(playerArray[i].name !== ""){
                    $.ajax({
                        url: "/api/players",
                        type: "POST",
                        data: playerArray[i]
                    }).then(function(result){
                        console.log(result);
                    });
                }
                if(i === playerArray.length - 1){
                    location.reload();
                }
            }
        });

    });


});
