var playerId;
var GameId = localStorage.getItem("currentGame");
$(function () {
    //set the sound for the house sound

    console.log("Im here before it loads")

    var removeStreet = $(".close")

    $.ajax({
        type: "GET",
        url: `/api/players/${GameId}`
    }).then(function (data) {
        renderPlayerData(data, data.length, 0);
        renderTokenOptions(data);
    });
})
$("#streets").on("click", ".addHouse", function (event) {
    event.preventDefault()
    var id = $(this).data("housing");
    var holder = $(`#${id}`);
    holder.empty();
    //cardBody.prepend(`<i class="fas fa-home"></i>`)
    //sound.play()
    var playerId = $(this).data("playerid")
    var propertyId = $(this).data("housing")
    $.ajax({
        type: "GET",
        url: `/api/playerProperties/property/${propertyId}`
    }).then(function (res) {
        var numH=res[0].numHouses
        var hotel =res[0].Hotel
        if(numH < 4 && hotel === false){
            numH += 1
        }else if(numH===4){
            hotel = true
            numH =0
        }
        var propertyObj ={
            numHouses : numH,
            Hotel: hotel
        }
       $.ajax({ 
           type:"PUT",
           url:`api/playerProperties/${propertyId}`,
           data:propertyObj
       }).then(function(res){
           $.ajax({
               type:"GET",
               url:`/api/playerProperties/property/${propertyId}`
           }).then(function(res){
               console.log(res)
               var sound = new Howl({
                src: ['assets/Sounds/hammer.mp4'],
                volume: 0.4
            });
               //if hotel is true render one hotel
               if(res[0].Hotel === true){
                var hotelIcon = $("<i>");
                hotelIcon.addClass("fas fa-hotel")
                holder.append(hotelIcon) 
            }else{
               for(var i = 0; i < res[0].numHouses;i++){
                console.log(id)
                var houseIcon = $("<i>");
                houseIcon.addClass("fas fa-home");
                holder.append(houseIcon);
                //sound.play()
               }
            }
           })
       })
    })
})
$("#streets").on("click", ".removeHouse",function(event){
    event.preventDefault();
    var id = $(this).data("housing");
    var houseDiv = $(`#${id}`);
    houseDiv.empty();
    var propertyId = $(this).data("housing")
    console.log($(this))
    $.ajax({
        type: "GET",
        url: `/api/playerProperties/property/${propertyId}`
    }).then(function(res){
        console.log(res)
        var numH = res[0].numHouses;
        var hotel = res[0].Hotel;
        if(hotel === true){
            numH = 4;
            hotel = false;
        } else if(numH <= 4 && numH > 0){
            numH -= 1;
        }
        var houseObj = {
            numHouses: numH,
            Hotel: hotel
        }
        $.ajax({
            type: "PUT",
            url:`api/playerProperties/${propertyId}`,
            data: houseObj
        }).then(function(){
            $.ajax({
                type: "GET",
                url:`/api/playerProperties/property/${propertyId}`
            }).then(function(res){
                for(var i = 0; i < res[0].numHouses;i++){
                    console.log(id)
                    var houseIcon = $("<i>");
                    houseIcon.addClass("fas fa-home");
                    houseDiv.prepend(houseIcon);
                }
            });
        })
    });
});

$("#addPlayer").on("click", function() {
    $.ajax({
        type:"GET",
        url:`/api/players/${GameId}`
    }).then(function(data){
        if(data.length < 8){
            $(".bg-modal").css("display", "flex");
            console.log('clicked');
        } else{
            alert("Player list is full!");
            return;
        }
    });

});

$("#streets").on("click", ".close", function(event){
    event.preventDefault();
    var id = $(this).data("housing");
    $.ajax({
        type: "DELETE",
        url: `/api/playerProperties/${id}`
    }).then(function(){
        location.reload();
    });
    
});

$("#name").on("click", ".deletePlayer", function(event){
    event.preventDefault();
    var playerId = $(this).data("playerid");
    $.ajax({
        type: "DELETE",
        url: `/api/players/${playerId}`
    }).then(function(){
        location.reload();
    });
});

$("#addPlayerForm").on("submit", function(event){
    event.preventDefault();
    var playerName = $("#newPlayerName").val().trim();
    var tokenChoice = $("#token-select").val();

    if(playerName !== "" && tokenChoice !=="Choose A Token"){
        var playerObj = {
            name: playerName,
            token: tokenChoice,
            GameId: GameId
        }
    
        $.ajax({
            type: "POST",
            url: "/api/players",
            data: playerObj
        }).then(function(){
            location.reload();
        });
    } else{
        alert("You must enter a name and choose a token.");
        return;
    }



});


function callingHouse() {
    $("#streets").on("click", ".addHouse", function () {
        var sound = new Howl({
            src: ['assets/Sounds/hammer.mp4'],
            volume: 0.4
        });
        console.log($(this))
        //  $.ajax({
        //     type:"GET",
        //     url:`/api/playerProperties/+${playerId}`
        //  }).then(function(res){
        //      console.log(playerId)
        //      console.log(res)
        //  })
        $(".addHouse").click(function (event) {
            event.preventDefault()

            var id = $(this).data("housing");
            var cardBody = $(`#${id}`);
            cardBody.prepend(`<i class="fas fa-home"></i>`)
            //sound.play()


        })
    })
}








// remove.on("click",(event)=>{
//     event.preventDefault()

// })
function renderPlayerData(playerArray, numPlayers, index) {
    if (index < numPlayers) {
        var chart = $(".jumbotron").find("#name");
        var money = $(".jumbotron").find($("#money"));
        var place = $(".jumbotron").find($("#place"));
        var street = $(".jumbotron").find($("#streets"));
        var token = $(".jumbotron").find($("#token"));
        var playerId = playerArray[index].id;
        var div = $("<div>");
        div.addClass("col");
        div.html(
            `<h5>
                ${playerArray[index].name}
                <button class="btn btn-danger ml-2 deletePlayer" data-playerid=${playerArray[index].id}>
                    <i class="fas fa-user-times"></i>
                </button>
            </h5>`
        );
        //adds player's token
        var tokenDiv = $("<div>");
        tokenDiv.addClass("col");
        tokenDiv.html(`<img src='${playerArray[index].token}'>`)
        //adds player's money
        var divTwo = $("<div>");
        divTwo.addClass("col success");
        divTwo.html(`<h4> $ ${playerArray[index].money}</h4>`);
        //adds the position of the player
        var divThree = $("<div>");
        divThree.addClass("col position");
        divThree.html(`<h4>${playerArray[index].position}</h4>`);
        //appending to file
        chart.append(div);
        token.append(tokenDiv);
        money.append(divTwo);
        place.append(divThree);
        //setting up another ajax call to get the player property card
        $.ajax({
            type: "GET",
            url: `/api/playerProperties/+${playerId}`
        }).then(function (result) {
            savCol = $("<col>");
            savCol.css("padding-left", "6px");
            var xIcon;
            var plusIcon;
            var lessIcon;
            var savCol;
            for (var i = 0; i < result.length; i++) {

                //creating the cards that will hold the info 
                cardDiv = $("<div>");
                cardDiv.addClass("card");
                var cardHeaderDiv = $("<div>");
                cardHeaderDiv.addClass("card-header text-center");
                cardHeaderDiv.css("background", result[i].Property.hex);
                cardHeaderDiv.text(result[i].Property.name);
                //creating the "x" button on top the of the card
                var closeBtn = $("<button  data-dismiss='alert' aria-label='Close' type='button'>");
                closeBtn.addClass("close");
                var xIcon = (`<span aria-hidden="true">&times;</span>`);
                //added the Icon to the button
                closeBtn.append(xIcon);
                closeBtn.attr("data-housing", result[i].id)
                //setting up the card body
                var cardBody = $("<div>");
                cardBody.addClass("card-body");
                //Icon holder
                var houseDiv = $("<div>");
                houseDiv.addClass("holder");
                houseDiv.attr("id",result[i].id );
                cardBody.append(houseDiv)
                //creates the add button for the houses
                var houseAddBtn = $("<button type='button'>");
                houseAddBtn.addClass("addHouse");
                houseAddBtn.addClass("float-right");
                houseAddBtn.attr("data-housing", result[i].id)
                houseAddBtn.attr("data-playerId", result[i].PlayerId)
                var plusIcon = (` <span aria-hidden="true"><i class="fas fa-plus"></i></span>`);
                houseAddBtn.append(plusIcon);
                //setting up the less button 
                var houseLessBtn = $("<button type='button'>");
                houseLessBtn.addClass("removeHouse float-right");
                houseLessBtn.attr("data-housing", result[i].id)
                houseLessBtn.attr("data-playerId", result[i].PlayerId)
                var lessIcon = (`<span aria-hidden="true"><i class="fas fa-minus"></i></span>`);
                houseLessBtn.append(lessIcon);
                //appending the houseless btn to card body
                cardBody.append(houseLessBtn);
                //appending house btn to card body 
                cardBody.append(houseAddBtn);
                //added the closeBtn to the card header
                cardHeaderDiv.append(closeBtn);
                cardDiv.append(cardHeaderDiv);
                cardDiv.append(cardBody);
                savCol.append(cardDiv);
                street.append(savCol);
            }
            renderPlayerData(playerArray, numPlayers, index + 1);
        });
    }
}

function renderTokenOptions(playerData){
    var tokenSelect = $("#token-select");
    var tokenArray = [
        "assets/img/mono_token_doggo.png",
        "assets/img/mono_token_tophat.png",
        "assets/img/mono_token_car.png",
        "assets/img/mono_token_battleship.png",
        "assets/img/mono_token_boot.png",
        "assets/img/mono_token_iron.png",        
        "assets/img/mono_token_thimble.png",
        "assets/img/mono_token_wheelbarrow.png"
    ];
    console.log(playerData);

    for(let i = 0; i < playerData.length; i++){
        if(tokenArray.includes(playerData[i].token)){
            tokenArray.splice(tokenArray.indexOf(playerData[i].token),1);
        }
    }

    for(let i = 0; i < tokenArray.length; i++){
        var tokenOption = $("<option>");
        tokenOption.attr("value",tokenArray[i]);
        if(tokenArray[i] === "assets/img/mono_token_doggo.png"){
            tokenOption.text("Dog");
        } else if (tokenArray[i] === "assets/img/mono_token_tophat.png"){
            tokenOption.text("Tophat");
        } else if (tokenArray[i] === "assets/img/mono_token_car.png"){
            tokenOption.text("Car");
        } else if (tokenArray[i] === "assets/img/mono_token_battleship.png"){
            tokenOption.text("Battleship");
        } else if (tokenArray[i] === "assets/img/mono_token_boot.png"){
            tokenOption.text("Boot");
        } else if (tokenArray[i] === "assets/img/mono_token_iron.png"){
            tokenOption.text("Iron");
        } else if (tokenArray[i] === "assets/img/mono_token_thimble.png"){
            tokenOption.text("Thimble");
        } else if (tokenArray[i] === "assets/img/mono_token_wheelbarrow.png"){
            tokenOption.text("Wheelbarrow");
        }
        tokenSelect.append(tokenOption);
    }


}