$(document).ready(function() {



$("#newBtn").on("click", function() {
    $(".bg-modal").css("display", "flex");
    console.log('clicked');
});

$("#createGameBtn").on("click", function() {
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

    var playerSetTitle = liEl.push(title);
    var playerSetp1 = liEl.push(p1);
    var playerSetp2 = liEl.push(p2);
    var playerSetp3 = liEl.push(p3);
    var playerSetp4 = liEl.push(p4);

    var set = $(ulEl).push(playerSetTitle, playerSetp1, playerSetp2, playerSetp3, playerSetp4);
    $("#gameList").append(set);
    console.log(set);

});


});
