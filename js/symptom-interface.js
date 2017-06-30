var Doctor = require('./../js/backend.js').doctorModule;

function displayInfo(address, educations, profile){
  var street = address.visit_address.street;
  var city = address.visit_address.city;
  var state = address.visit_address.state_long;
  var zip = address.visit_address.zip;
  var firstName = profile.first_name;
  var lastName = profile.last_name;
  var bio = profile.bio;
  var img = profile.image_url;
  if(educations.length > 0){
    var degree = educations[0].degree;
    var school = educations[0].school;
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Address: " + street +" "+ city + " " + state + " " + zip + "</li>" +
    "<li>Degree: " + degree + "</li>" +
    "<li>School: " + school + "</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  } else {
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Address: " + street +" "+ city + " " + state + " " + zip + "</li>" +
    "<li>Degree: Not available</li>" +
    "<li>School: Not available</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  }

}

function displayRest(educations, profile){
  var firstName = profile.first_name;
  var lastName = profile.last_name;
  var bio = profile.bio;
  var img = profile.image_url;
  if(educations.length > 0){
    var degree = educations[0].degree;
    var school = educations[0].school;
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Degree: " + degree + "</li>" +
    "<li>School: " + school + "</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  } else {
    $("#display").append("<ul>" +
    "<li>Name: " + firstName +" "+ lastName + "</li>" +
    "<li>Degree: Not available</li>" +
    "<li>School: Not available</li>" +
    "<li>Bio: " + bio +"</li>" +
    "</ul>");
  }
}

function displayError(){
  $("#display").text("Doctors not found.")
}



$(document).ready(function(){
  $("#search-form").submit(function(event){
    event.preventDefault();
    $("#display").empty();
    var name = $("#name").val();
    var medIssue = $("#medical-issue").val();
    var location = $("#location").val();
    var gender = $("#gender").val();
    var specialty = $("#specialty").val();
    var Doctors = new Doctor(name, medIssue, location, gender);

    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      var latitude = pos.coords.latitude;
      var longitude = pos.coords.longitude;
      var currentLocation = latitude + "," + longitude;

      Doctors.searchDoctor(Doctors.Name, Doctors.Issue, Doctors.Location, specialty, currentLocation, Doctors.Gender, displayInfo, displayRest, displayError);
    }

    function error(err) {
      $("#display").text("error: " + err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

  });
});
