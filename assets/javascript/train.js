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

//Train Variables
  var trainName = $("#train-name").val().trim();
  var destination = $("#destination").val().trim();
  var trainTime = $("#train-time").val().trim();
  var frequency = $("#frequency").val().trim();
  var convertedTime = moment(trainTime, "HH:mm A");
  var trainTimePretty = moment(convertedTime).format("HH:mm A");
  var nextArrival = moment(convertedTime).diff(moment(), "minutes");
  // var updateBtn = $("<button type='submit' id='updateBtn' class='btn btn-primary'>" + Update Train + " </button>");

//Push variables to Firebase    
  database.ref().push({
    trainName : trainName,
    destination : destination,
    trainTime : trainTimePretty,
    frequency : frequency,
    minsAway : nextArrival
  });
});

//Display all train times with most recent submission listed first
database.ref().on("child_added", function(snapshot){
  var child = snapshot.val();
  $(".train-list").prepend("<tr> <td>"+child.trainName+"</td> <td>"+child.destination+"</td> <td>"+child.frequency+"</td> <td>"+child.trainTime+"</td> <td>"+child.minsAway+"</td> <td><button type='submit' id='updateBtn' class='btn btn-default-xs'>Edit</button></td> <td><button type='submit' id='deleteBtn' class='btn btn-danger'>Clear</button></td> </tr>");
});

});