$(document).ready(function(){

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAqgqgYfLJzM4QdD_dPWUXxe1k3cNIej1k",
  authDomain: "train-time-d0ae8.firebaseapp.com",
  databaseURL: "https://train-time-d0ae8.firebaseio.com",
  projectId: "train-time-d0ae8",
  storageBucket: "train-time-d0ae8.appspot.com",
  messagingSenderId: "216462761639"
};

firebase.initializeApp(config);

var database = firebase.database();

//On-click funciton
$("#submit-button").on("click", function(event){
    event.preventDefault();

//Train variables
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var firstTrainTime = $("#train-time").val().trim();
  var frequency = parseInt($("#frequency").val().trim());

//Convert train time
  var convertTime = moment(firstTrainTime, "HH:mm A");
  var firstTimeConverted = moment(convertTime).format("HH:mm A");
  var diffTime = moment().diff(moment(convertTime), "minutes");
  var tRemainder = diffTime % frequency;
  var minutesTillTrain = frequency - tRemainder;
  var nextTrain = moment().add(minutesTillTrain, "minutes");
  var convertTime2 = moment(nextTrain, "HH:mm A");
  var nextTrainFormatted = moment(convertTime2).format("HH:mm A");       

//Push variables to Firebase    
  database.ref().push({
    trainName : trainName,
    destination : destination,
    firstTrainTime : firstTrainTime,
    frequency : frequency,
    nextTrain : minutesTillTrain,
    nextArrival : nextTrainFormatted
  });
});

//Display all train times with most recent submission listed first
database.ref().on("child_added", function(snapshot){
  var child = snapshot.val();
  $(".train-list").prepend("<tr> <td>"+child.trainName+"</td> <td>"+child.destination+"</td> <td>"+child.frequency+"</td> <td>"+child.nextArrival+"</td> <td>"+child.nextTrain+"</td></tr>");
});

});