var sound = new Howl({
  src: ['assets/Sounds/cash.mp4']
   });
console.log("Im here before it loads")


var addBtn = $(".addHouse")
var dltBtn = $(".removeHouse")

addBtn.on("click",function(event){
    event.preventDefault()
    sound.play()
    $(".card-body").prepend(`<i class="fas fa-home"></i>`)
    console.log("Added house")
    
})

dltBtn.on("click",(event)=>{
    event.preventDefault();
    $(this).remove("i")
    console.log("removed house")
})