$(document).ready(function() {



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

    var newDiv = $("<div>").addClass("gameBlock");
    var ulEl = $("<ul>");

    ulEl.append($("<li>").text(title));
    ulEl.append($("<li>").text(p1));
    ulEl.append($("<li>").text(p2));
    ulEl.append($("<li>").text(p3));
    ulEl.append($("<li>").text(p4));

    newDiv.html(ulEl);
    $("#gameList").append(newDiv);
    console.log(ulEl);

});


});
