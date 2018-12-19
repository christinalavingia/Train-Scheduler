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
    var firstTimeConverted = moment(newTrainObj.time, "HH:mm");
    var currentTime = moment();
    var diffTime = currentTime.diff(firstTimeConverted, "minutes");
    var tRemainder = diffTime % newTrainObj.frequency;
    var minutesTillTrain = newTrainObj.frequency - tRemainder;
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    var nextTrainFormatted = nextTrain.format("HH:mm");

    var newRow = $("<tr>");
    var nameCol = $("<td>").text(newTrainObj.name);
    newRow.append(nameCol);
    var destinationCol = $("<td>").text(newTrainObj.destination);
    newRow.append(destinationCol)
    var frequencyCol = $("<td>").text(newTrainObj.frequency);
    newRow.append(frequencyCol);
    var nextTrainCol = $("<td>").text(nextTrainFormatted);
    newRow.append(nextTrainCol);
    var minutesAwayCol = $("<td>").text(minutesTillTrain);
    newRow.append(minutesAwayCol);

    $("#train-data").append(newRow);
}

ref.on("child_added", function(snapshot) {
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