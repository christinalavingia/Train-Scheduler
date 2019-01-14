var config = {
    apiKey: "AIzaSyB1Ceu217BWTDvXWFGLuNwegmEZxy6iL8I",
    authDomain: "train-scheduler-9fe5b.firebaseapp.com",
    databaseURL: "https://train-scheduler-9fe5b.firebaseio.com",
    projectId: "train-scheduler-9fe5b",
    storageBucket: "train-scheduler-9fe5b.appspot.com",
    messagingSenderId: "863352627172"
};

firebase.initializeApp(config);

var trainData = firebase.database();

$("#add-train").on("click", function () {
    var trainName = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = moment($("#train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
})

trainData.ref().on("child_added", function (snapshot) {
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    $("#train-data").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
})