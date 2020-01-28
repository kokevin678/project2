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
            for(let i = 0; i < gameData.length; i++){
                $.ajax({
                    url: `/api/players/${gameData[i].id}`,
                    type: "GET"
                }).then(function(playerData){
                    console.log(playerData);
                    var gameBlock = $("<div>").addClass("gameBlock");

                    var gameName = $("<h1>");
                    gameName.text(gameData[i].name);

                    var ul = $("<ul>");

                    var startButton = $("<a>");
                    startButton.addClass("startBtn btn");
                    startButton.attr('data-gameid',`${gameData[i].id}`);
                    startButton.attr('href', "/game");
                    startButton.text("Start");

                    var deleteButton = $("<button>");
                    deleteButton.addClass("deleteBtn ml-3");
                    deleteButton.attr('data-gameid', `${gameData[i].id}`);
                    deleteButton.text("Delete");

                    for(let j = 0; j < playerData.length; j++){
                        var li = $("<li>");
                        li.text(playerData[j].name);
                        ul.append(li);
                    }
    
                    gameBlock.append(gameName);
                    gameBlock.append(ul);
                    gameBlock.append(startButton);
                    gameBlock.append(deleteButton);
                    gameList.append(gameBlock);
                });
            }
        });
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

    $("#newBtn").on("click", function() {
        $(".bg-modal").css("display", "flex");
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

        var newGame = {
            name: title
        }

        $.ajax({
            url: "/api/games",
            type: "POST",
            data: newGame
        }).then(function(result){

            var playerArray = [
                {
                    name: p1,
                    token: "Dog",
                    GameId: result.id
                },
                {
                    name: p2,
                    token: "Hat",
                    GameId: result.id
                },
                {
                    name: p3,
                    token: "Car",
                    GameId: result.id
                },
                {
                    name: p4,
                    token: "Ship",
                    GameId: result.id
                },
            ];

            for(let i = 0; i < playerArray.length; i++){
                $.ajax({
                    url: "/api/players",
                    type: "POST",
                    data: playerArray[i]
                }).then(function(result){
                    console.log(result);
                    if(i === playerArray.length - 1){
                        renderGameList();
                    }
                });
            }
        });

    });


});
