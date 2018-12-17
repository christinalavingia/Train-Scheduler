$(document).ready(function() {

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

    $("#add-train").on("click", function(event) {
        event.preventDefault();

        var newTrain = {
            name: $("#train-name").val().trim(),
            destination: $("#destination").val().trim(),
            time: $("#train-time").val().trim(),
            frequency: $("#frequency").val().trim()
        };
        console.log(newTrain);
        addToTable(newTrain);
        $("#train-name").val("");
        $("#destination").val("");
        $("#train-time").val("");
        $("#frequency").val("");
    });
});