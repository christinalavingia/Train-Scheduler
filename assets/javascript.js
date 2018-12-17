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
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var time = moment($("#train-time").val().trim());
    var frequency = $("#frequency").val().trim();

// Creates a temporary object for train data
var trainData = {
    name: name,
    destination: destination,
    time: time,
    frequency: frequency 
}
// Pushes new train data to database
    database.ref().push(trainData);

// Logs new train data to the console
    console.log(trainData.name);
    console.log(trainData.destination);
    console.log(trainData.time);
    console.log(trainData.frequency);

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
var diffTime = moment().diff(moment.unix(trainTime), "minutes");
console.log(diffTime);
var timeRemainder = moment().diff(moment.unix(trainTime), "minutes") % trainFrequency;

// Minutes before next train
var minutesAway = trainFrequency - timeRemainder;

// Next train arrival
var nextArrival = moment().add(minutesAway, "m").format("HH:mm A");

// Pushes new trains to the table
var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
);

    $("#train-data").append(newRow);
});