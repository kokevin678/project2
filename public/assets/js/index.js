

$(function(){
    //set the sound for the house sound

  console.log("Im here before it loads")
  
  var dltBtn = $(".removeHouse")
  var removeStreet = $(".close")
  
  
  dltBtn.on("click",(event)=>{
      event.preventDefault();
      var id = $(this).data("housing");
      var cardBody = $(`#${id}`);
  
      cardBody.remove("i")
      console.log("removed house")
  })
    $.ajax({
        type:"GET",
        url:"/api/players/1"
    }).then(function(data){
        //test to see if the object works
        console.log(data[0].position)
        var playerId;
        //
        //targets the name section to add the name 
        var chart = $(".jumbotron").find("#name")
        var money = $(".jumbotron").find($("#money"))
        var place = $(".jumbotron").find($("#place"))
        var street = $(".jumbotron").find($("#streets"))
        //loop throught the object to get the information from the table player 
        for(var i = 0 ; i < data.length;i++){
            playerId = data[i].id
        //adds a div for each name to then add to the name section
            var div = $("<div>")
            div.addClass("col")
            div.html(`<h5>${data[i].name}</h5>`)
            
        //adds the money amount to player
            var divTwo = $("<div>")
            divTwo.addClass("col success");
            divTwo.html(`<h4> $ ${data[i].money}</h4>`)
            console.log(data[i].name)

         //adds the position of the player
         var divThree = $("<div>");
         divThree.addClass("col position")
         divThree.html(`<h4>${data[i].position}</h4>`)
         console.log(playerId)
        //setting up another ajax call to get the player property card
            $.ajax({
                type:"GET",
                url:`/api/playerProperties/+${playerId}`
            }).then(function(result){
                console.log(result)
                savCol = $("<col>");
                savCol.css("padding-left","6px");
                var xIcon;
                var plusIcon;
                var lessIcon;
                var savCol;
                for(var i = 0; i < result.length;i++){
            
                //creating the cards that will hold the info 
                cardDiv =$("<div>")
                cardDiv.addClass("card")
                var cardHeaderDiv = $("<div>")
                cardHeaderDiv.addClass("card-header text-center");
                cardHeaderDiv.css("background",result[i].Property.hex);
                cardHeaderDiv.text(result[i].Property.name)
                //creating the "x" button on top the of the card
                var closeBtn = $("<button  data-dismiss='alert' aria-label='Close' type='button'>")
                closeBtn.addClass("close");
                var xIcon  = (`<span aria-hidden="true">&times;</span>`)
                //added the Icon to the button
                closeBtn.append(xIcon)
                
                //setting up the card body
                var cardBody = $("<div>")
                cardBody.addClass("card-body")
                cardBody.attr("id",[i])
                var houseAddBtn = $("<button type='button'>")
                houseAddBtn.addClass("addHouse")
                houseAddBtn.addClass("float-right")
                houseAddBtn.attr("data-housing",[i])
                var plusIcon = (` <span aria-hidden="true"><i class="fas fa-plus"></i></span>`)
                houseAddBtn.append(plusIcon)
                //setting up the less button 
                var houseLessBtn = $("<button type='button'>")
                houseLessBtn.addClass("removeHouse float-right")
                var lessIcon = (`<span aria-hidden="true"><i class="fas fa-minus"></i></span>`);
                houseLessBtn.append(lessIcon)
                //appending the houseless btn to card body
                cardBody.append(houseLessBtn);
                //appending house btn to card body 
                cardBody.append(houseAddBtn)
                //added the closeBtn to the card header
                cardHeaderDiv.append(closeBtn)
                cardDiv.append(cardHeaderDiv)
                cardDiv.append(cardBody)
                // savCol = $("<col>");
                // savCol.css("padding-left","6px");
                savCol.append(cardDiv)
                street.append(savCol)

                }

                //button listeners should be render here
                var sound = new Howl({
                    src: ['assets/Sounds/hammer.mp4'],
                    volume:0.4
                     });
                     
                     $(".addHouse").click(function(event){
                    event.preventDefault()
                        //console.log($(this).data("housing"))
                        //console.log($(".card-body").find("#one"))
                
                        var id = $(this).data("housing");
                        var cardBody = $(`#${id}`);
                        console.log(id)
                        cardBody.prepend(`<i class="fas fa-home"></i>`)
                        sound.play()
                    
                    
                    
                })
                

            })
         //appending to file
            chart.append(div)
            money.append(divTwo)
            place.append(divThree)
            
        }
        
    })
})










// remove.on("click",(event)=>{
//     event.preventDefault()

// })