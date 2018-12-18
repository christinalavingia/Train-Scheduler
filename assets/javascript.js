var config = {
    apiKey: "AIzaSyB1Ceu217BWTDvXWFGLuNwegmEZxy6iL8I",
    authDomain: "train-scheduler-9fe5b.firebaseapp.com",
    databaseURL: "https://train-scheduler-9fe5b.firebaseio.com",
    projectId: "train-scheduler-9fe5b",
    storageBucket: "train-scheduler-9fe5b.appspot.com",
    messagingSenderId: "863352627172"
};

firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref();

function addTrain(newTrainObj) {
    ref.push(newTrainObj);
}

function addToTable(newTrainObj) {
    var newRow = $("<tr>");
    var nameCol = $("<td>").text(newTrainObj.name);
    newRow.append(nameCol);
    var destinationCol = $("<td>").text(newTrainObj.destination);
    newRow.append(destinationCol)
    var frequencyCol = $("<td>").text(newTrainObj.frequency);
    newRow.append(frequencyCol);
    var nextTrainCol = $("<td>").text("Compute me");
    newRow.append(nextTrainCol);
    var minutesAwayCol = $("<td>").text("Compute me");
    newRow.append(minutesAwayCol);

    $("#train-data").append(newRow);
}

ref.on("child_added", function(snapshot) {
    console.log(snapshot.val());
    addToTable(snapshot.val());
});

$(document).ready(function () {

    $("#add-train").on("click", function (event) {
        event.preventDefault();

        var newTrain = {
            name: $("#train-name").val().trim(),
            destination: $("#destination").val().trim(),
            time: $("#train-time").val().trim(),
            frequency: $("#frequency").val().trim()
        };
        console.log(newTrain);

        addTrain(newTrain);
    });
});