$(document).ready(function() {



$("#newBtn").on("click", function() {
    $(".bg-modal").css("display", "flex");
    console.log('clicked');
});

$("#createGameBtn").on("click", function(e) {
    event.preventDefault();
    var title = $("#gameTitle").val();
    var p1 = $("#player1").val();
    var p2 = $("#player2").val();
    var p3 = $("#player3").val();
    var p4 = $("#player4").val();
    console.log(title)
    console.log(p1)
    console.log(p2)
    console.log(p3)
    console.log(p4)

    var ulEl = $("<ul>");
    var liEl = $("<li>");

    var playerSetTitle = ulEl.html(liEl.text(title));
    var playerSetp1 = liEl.text(p1);
    var playerSetp2 = liEl.text(p2);
    var playerSetp3 = liEl.text(p3);
    var playerSetp4 = liEl.text(p4);

    // var set = ulEl.append(playerSetTitle);
    $("#gameList").append(playerSetTitle);
    console.log(playerSetTitle);

});


});
