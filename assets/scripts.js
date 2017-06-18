//Set false while user dont insert your nickname
$(document).ready(function(){
    var socket = io.connect("http://localhost:4200");
    var ready = false;

    //Save nickname and open chat
    $("#submit").submit(function(e) {
    e.preventDefault();
    $("#nick").fadeOut();
    $("#chat").fadeIn();
    var name = $("#nickname").val();
    var time = new Date();
    $("#name").html(name);
    $("#time").html('First login: ' + time.getHours() + ':' + time.getMinutes());

    ready = true;
    socket.emit("join", name);
});

});