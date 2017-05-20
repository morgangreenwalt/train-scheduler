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
    var minsAway = "";
    var convertedTime = moment(trainTime, "HH:MM A");
    console.log(convertedTime);
    var trainTimePretty = moment(convertedTime).format("HH:MM A");
    console.log(trainTimePretty);
    var nextArrival = moment(convertedTime).diff(moment(), "minutes");
    console.log(nextArrival);
    // var minsAway = empMonths * empRate;

//Push variables to Firebase    
    database.ref().push({
      trainName : trainName,
      destination : destination,
      trainTime : trainTime,
      frequency : frequency,
      minsAway: minsAway
    });

  });

  database.ref().on("child_added", function(snapshot){
    var child = snapshot.val();

    $(".train-list").prepend("<tr> <td>"+child.trainName+"</td> <td>"+child.destination+"</td> <td>"+child.trainTime+"</td> <td>"+child.frequency+"</td> <td>"+child.minsAway+"</td> </tr>");
    // console.log(convertedTime);
  });

});