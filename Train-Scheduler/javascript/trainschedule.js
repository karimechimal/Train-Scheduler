var config = {
    apiKey: "AIzaSyCRdEahmG5rHuBmEDPkiQ6YUTKBNDCHUgY",
    authDomain: "train-schedule-93103.firebaseapp.com",
    databaseURL: "https://train-schedule-93103.firebaseio.com",
    projectId: "train-schedule-93103",
    storageBucket: "train-schedule-93103.appspot.com",
    messagingSenderId: "388790999028"
  };


  firebase.initializeApp(config);

  var database = firebase.database();



var name ='';
var destination = '';
var firstTrainTime = '';
var frequency = '';
var nextTrain = '';
var nextTrainFormatted = '';
var minutesAway = '';
var firstTimeConverted = '';
var currentTime = '';
var diffTime = '';
var tRemainder = '';
var minutesTillTrain = '';
var getKey = '';



$("#add-train").on("click", function(event) {
     event.preventDefault();

     
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTrainTime = $('#first-train-time-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesTillTrain = frequency - tRemainder;
          nextTrain = moment().add(minutesTillTrain, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");

     	database.ref().push({
     		name: name,
     		destination: destination,
     		firstTrainTime: firstTrainTime,
     		frequency: frequency,
               nextTrainFormatted: nextTrainFormatted,
               minutesTillTrain: minutesTillTrain
               
     	});

          $('#name-input').val().trim();
     	$('#destination-input').val().trim();
     	$('#first-train-time-input').val().trim();
     	$('#frequency-input').val().trim();

     	return false;
     });

     database.on("child_added", function(childSnapshot) {


		$('.train-schedule').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainFormatted + 
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesTillTrain + 
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");


}), 

function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    };


$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getKey = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});
