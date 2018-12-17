$(document).ready(function() {

 // Initializes Firebase
 var config = {
    apiKey: "AIzaSyB1Ceu217BWTDvXWFGLuNwegmEZxy6iL8I",
    authDomain: "train-scheduler-9fe5b.firebaseapp.com",
    databaseURL: "https://train-scheduler-9fe5b.firebaseio.com",
    projectId: "train-scheduler-9fe5b",
    storageBucket: "train-scheduler-9fe5b.appspot.com",
    messagingSenderId: "863352627172"
  };
  firebase.initializeApp(config);

var database = firebase.database();

 // Creates an on-click event when the submit button is clicked
 $("#add-train").on("click", function(event) {
    event.preventDefault();

// Stores user input as an object
    var newTrain = {
        name: $("#train-name").val().trim(),
        destination: $("#destination").val().trim(),
        time: $("#train-time").val().trim(),
        frequency: $("#frequency").val().trim()
    };

// Creates a temporary object for train data
var trainData = {
    name: newTrain.name,
    destination: newTrain.destination,
    time: newTrain.time,
    frequency: newTrain.frequency 
}

// Pushes new train data to database
    database.ref().push(trainData);

// Logs new train data to the console
    console.log(trainData);

// Clears all text boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-time").val("");
    $("#frequency").val("");
});

// Creates Firebase event for adding a train to the database and a row to the HTML when a user adds a train
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

// Stores database values as variables
var trainName = childSnapshot.val().name;
var trainDestination = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var trainFrequency = childSnapshot.val().frequency;

// Logs train info to the console
console.log(trainName);
console.log(trainDestination);
console.log(trainTime);
console.log(trainFrequency);

// Calculates next arrival
var nextArrival = moment().diff(moment.unix(trainTime), "minutes");
var minutesAway = 


// Pushes new trains to the table
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
});
});